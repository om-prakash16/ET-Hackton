import redis
from app.core.config import settings

class RedisClient:
    def __init__(self):
        self.client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)

redis_client = RedisClient().client
