import json
import logging
import asyncio
from aiokafka import AIOKafkaConsumer
from sqlalchemy.future import select

from app.core.config import settings
from app.db.session import AsyncSessionLocal
from app.models.document import DocumentMetadata
from app.services.parser import get_parser
from app.services.chunking import SemanticChunker
from app.services.embeddings import EmbeddingService
from app.services.graph import GraphExtractionService

logger = logging.getLogger(__name__)

class DocumentPipelineWorker:
    def __init__(self):
        self.consumer = None
        self.chunker = SemanticChunker(chunk_size=500, overlap=50)
        self.embedder = EmbeddingService()
        self.graph_extractor = GraphExtractionService()
        self.is_running = False

    async def start(self):
        try:
            self.consumer = AIOKafkaConsumer(
                "document.uploaded",
                bootstrap_servers=settings.KAFKA_BROKER,
                group_id="pipeline-workers",
                value_deserializer=lambda x: json.loads(x.decode('utf-8'))
            )
            # Timeout rapidly if Kafka is not available
            await asyncio.wait_for(self.consumer.start(), timeout=2.0)
            self.is_running = True
            logger.info("DocumentPipelineWorker started and listening to 'document.uploaded'.")
            asyncio.create_task(self.consume_loop())
        except Exception as e:
            logger.warning(f"Kafka Consumer failed to connect (Demo Mode active?): {e}. Worker disabled.")
            self.is_running = False
            self.consumer = None

    async def stop(self):
        self.is_running = False
        if self.consumer:
            await self.consumer.stop()
            logger.info("DocumentPipelineWorker stopped.")

    async def consume_loop(self):
        while self.is_running:
            try:
                # Wait for message
                msg = await self.consumer.getone()
                payload = msg.value
                await self.process_message(payload)
            except Exception as e:
                # Ignore simple timeout/close errors during shutdown
                if self.is_running:
                    logger.error(f"Error in consume_loop: {e}")
                await asyncio.sleep(1)

    async def update_status(self, doc_id: str, status: str):
        async with async_session_maker() as session:
            query = select(DocumentMetadata).where(DocumentMetadata.id == doc_id)
            result = await session.execute(query)
            doc = result.scalars().first()
            if doc:
                doc.status = status
                await session.commit()
                logger.info(f"Document {doc_id} status changed to {status}")

    async def process_message(self, payload: dict):
        document_id = payload.get("document_id")
        org_id = payload.get("org_id")
        blob_uri = payload.get("blob_uri")
        file_type = payload.get("file_type")
        
        if not document_id or not blob_uri:
            logger.error(f"Invalid payload received: {payload}")
            return
            
        logger.info(f"Worker picked up document {document_id}")
        await self.update_status(document_id, "PROCESSING")

        try:
            # 1. Fetch File (simulate downloading from S3 using local proxy)
            file_path = blob_uri.replace("local://", "")
            
            # 2. Parse PDF/Document
            parser = get_parser(file_type)
            parsed_data = parser.parse(file_path)
            full_text = parsed_data["text"]
            
            # 3. Extract Entities to Neo4j
            await self.graph_extractor.extract_and_ingest(document_id, org_id, full_text)
            
            # 4. Semantic Chunking
            chunks = self.chunker.chunk_text(full_text)
            
            # 5. Generate Embeddings & Push to Qdrant
            if chunks:
                await self.embedder.ingest_chunks(org_id, document_id, chunks)

            # 6. Complete
            await self.update_status(document_id, "READY")
            logger.info(f"Successfully processed document {document_id}")
            
            # Here we would normally publish `document.completed` to Kafka
            # await event_publisher.publish("document.completed", {"document_id": document_id})
            
        except Exception as e:
            logger.error(f"Pipeline failed for document {document_id}: {e}")
            await self.update_status(document_id, "FAILED")

pipeline_worker = DocumentPipelineWorker()
