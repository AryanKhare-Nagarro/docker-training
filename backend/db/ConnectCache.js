// Import Redis client
import { createClient } from 'redis';

// Create a Redis client with connection details
// Note: Ensure that Redis server is running on docker container with port 6379
export const client = createClient({
    socket: {
        host: 'redis',
        port: 6379,
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