import json
import logging
import asyncio
from typing import List
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

logger = logging.getLogger("IndustrialBrain.Telemetry.WebSocket")
router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket Client Connected. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info(f"WebSocket Client Disconnected. Total: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        if not self.active_connections:
            return
            
        data = json.dumps(message)
        failed = []
        for connection in self.active_connections:
            try:
                await connection.send_text(data)
            except Exception as e:
                logger.error(f"Failed to send message to client: {e}")
                failed.append(connection)
                
        for f in failed:
            self.disconnect(f)

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # We don't expect clients to send data, just listen.
            # But we need to keep the connection open and handle disconnects.
            data = await websocket.receive_text()
            logger.debug(f"Received from WS client: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
