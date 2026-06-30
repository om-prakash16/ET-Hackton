import json
import logging
import asyncio
from aiokafka import AIOKafkaProducer
from app.core.config import settings

logger = logging.getLogger(__name__)

class EventPublisher:
    def __init__(self):
        self.producer = None

    async def start(self):
        try:
            self.producer = AIOKafkaProducer(
                bootstrap_servers=settings.KAFKA_BROKER,
                value_serializer=lambda v: json.dumps(v).encode('utf-8')
            )
            # Short timeout to avoid hanging during startup if Kafka is dead
            await asyncio.wait_for(self.producer.start(), timeout=2.0)
            logger.info("Kafka Producer started successfully.")
        except Exception as e:
            logger.warning(f"Kafka Producer failed to connect (Demo Mode active?): {e}. Events will be disabled.")
            self.producer = None

    async def stop(self):
        if self.producer:
            await self.producer.stop()
            logger.info("Kafka Producer stopped.")

    async def publish(self, topic: str, message: dict):
        if not self.producer:
            logger.warning(f"Kafka Producer not active. Skipping event for topic '{topic}'. Message: {message}")
            return
            
        try:
            await self.producer.send_and_wait(topic, message)
            logger.info(f"Published event to '{topic}': {message}")
        except Exception as e:
            logger.error(f"Failed to publish event to '{topic}': {e}")

# Global singleton instance
event_publisher = EventPublisher()
