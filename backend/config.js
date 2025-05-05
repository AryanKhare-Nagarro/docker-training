const requiredEnvVars = [
    'BACKEND_PORT',
    'MONGO_URL'
];


for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Error: Environment variable ${envVar} is not set.`);
        process.exit(1); // Exit the process with an error code
    }
}

export const configs = {
    db: {
        mongodb_url: process.env.MONGO_URL,
    },
    server: {
        port: process.env.BACKEND_PORT,
    }
}