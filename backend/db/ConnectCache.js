import redis from 'redis';

export const client = redis.createClient({
    socket: {
        host: 'localhost',
        port: 6379,
    },
});

export const connectRedis = async () => {
    try {
        if(!client.isOpen) {
            await client.connect();
            console.log('Redis connected successfully!');
        } else {
            console.log('Redis client is already connected!');
        }
    } catch (err) {
        console.error('Redis connection error:', err);
    }
}