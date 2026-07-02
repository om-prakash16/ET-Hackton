import asyncio
import random
import time
import logging
from app.domains.telemetry.api import manager

logger = logging.getLogger("IndustrialBrain.Telemetry.Engine")

class TelemetrySimulator:
    def __init__(self):
        self.is_running = False
        self.tick_rate_seconds = 2.0
        self.anomaly_interval_seconds = 30.0 # Force an anomaly every 30s
        self.last_anomaly_time = time.time()
        
        # Base state for assets
        self.assets = {
            "P-101A": {"pressure": 120.0, "vibration": 2.1, "temperature": 75.0, "status": "NOMINAL"},
            "ST-402": {"pressure": 400.0, "vibration": 1.5, "temperature": 320.0, "status": "NOMINAL"},
            "V-201": {"pressure": 50.0, "vibration": 0.5, "temperature": 45.0, "status": "NOMINAL"}
        }

    async def start(self):
        if self.is_running:
            return
        
        self.is_running = True
        logger.info("Telemetry Simulator Engine Started.")
        
        # Give the server a few seconds to boot before streaming
        await asyncio.sleep(5)
        
        while self.is_running:
            try:
                await self.tick()
                await asyncio.sleep(self.tick_rate_seconds)
            except Exception as e:
                logger.error(f"Telemetry Engine Error: {e}")

    def stop(self):
        self.is_running = False
        logger.info("Telemetry Simulator Engine Stopped.")

    async def tick(self):
        now = time.time()
        should_trigger_anomaly = (now - self.last_anomaly_time) > self.anomaly_interval_seconds
        
        events = []
        
        for asset_tag, state in self.assets.items():
            # Add random noise
            state["pressure"] += random.uniform(-2.0, 2.0)
            state["vibration"] += random.uniform(-0.1, 0.1)
            state["temperature"] += random.uniform(-0.5, 0.5)
            
            # Keep values positive
            state["pressure"] = max(0, state["pressure"])
            state["vibration"] = max(0, state["vibration"])
            
            event = {
                "type": "telemetry",
                "timestamp": int(now * 1000),
                "asset": asset_tag,
                "data": {
                    "pressure": round(state["pressure"], 2),
                    "vibration": round(state["vibration"], 2),
                    "temperature": round(state["temperature"], 2)
                }
            }
            events.append(event)
            
        # Trigger an anomaly
        if should_trigger_anomaly:
            self.last_anomaly_time = now
            anomaly_asset = random.choice(["P-101A", "ST-402", "V-201"])
            
            # Spike the values
            self.assets[anomaly_asset]["pressure"] *= 1.5
            self.assets[anomaly_asset]["vibration"] *= 2.5
            
            anomaly_event = {
                "type": "alert",
                "timestamp": int(now * 1000),
                "asset": anomaly_asset,
                "severity": "CRITICAL",
                "title": f"{anomaly_asset} Critical Degradation Detected",
                "message": f"AI Engine detected severe anomalies in {anomaly_asset} pressure and vibration patterns. Recommended Action: Isolate immediately.",
            }
            events.append(anomaly_event)
            logger.warning(f"Simulated Anomaly Generated for {anomaly_asset}")

        # Broadcast all events
        for ev in events:
            await manager.broadcast(ev)

telemetry_engine = TelemetrySimulator()
