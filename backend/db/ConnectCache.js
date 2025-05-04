// Import Redis client
import { createClient } from 'redis';
import { configs } from '../config.js'; // Import config to ensure environment variables are loaded 

// Create a Redis client with connection details
// Note: Ensure that Redis server is running on docker container with port 6379 exposed
export const client = createClient({
    socket: {
        host: 'redis',
        port: configs.cache.redis_port,
    },
});

// Function to connect to Redis
export const connectRedis = async () => {
    try {
        // Check if the Redis client is already connected
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