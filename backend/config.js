// List of required environment variables
const requiredEnvVars = [
    'BACKEND_PORT',
    'MONGO_URL'
];

// Validate that all required environment variables are set
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Error: Environment variable ${envVar} is not set.`);
        process.exit(1); // Exit the process with an error code
    }
}

// Export configuration settings for the application
export const configs = {
    db: {
        mongodb_url: process.env.MONGO_URL,
    },
    server: {
        port: process.env.BACKEND_PORT,
    }
}