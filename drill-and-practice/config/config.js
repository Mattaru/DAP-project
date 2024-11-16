export const PORT = 7777;

// Here you can setup restrictions for your routes.
export const RESTRICTEDPATHES = [
    "/topics",
    "/quiz",
];

// API
// Cross-Origin Resource Sharing settings for your API
export const CORS = {
    origin: "*", // Allow all origins
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Allow common methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow common headers
    credentials: false, // Disallow credentials (cookies, etc.) by default
    preflightContinue: false, // End preflight requests with a simple response
    optionsSuccessStatus: 204, // Standard success status for preflight requests
};