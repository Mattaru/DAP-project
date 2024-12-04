// API.
// Cross-Origin Resource Sharing settings for your API
export const CORS = {
    origin: (ctx) => {
        const allowedOrigins = [
            "http://127.0.0.1:5173", // Local dev frontend
            "https://your-frontend-production-url.com", // Production frontend
            // Add any other origins you want to allow
        ];
        const requestOrigin = ctx.request.headers?.get("origin") || "";

        if (allowedOrigins.includes(requestOrigin)) {
            return requestOrigin; // Return the origin for allowed origins (with credentials)
        }
    
        return "*"; // For other origins, allow all but without credentials
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Allow common methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow common headers
    credentials: true, // Allow credentials (cookies, etc.)
    preflightContinue: false, // End preflight requests with a simple response
    optionsSuccessStatus: 204, // Standard success status for preflight requests
};

// DataBase.
export const DATABASE_URL = Deno.env.get("DATABASE_URL");
export const DAP_DB_URL = Deno.env.get("DAP_DB_URL"); // Url for Render DB

export const CONCURRENT_CONNECTIONS = 10; // DB Pools

// Flyway.
export const FLYWAY_URL = Deno.env.get("FLYWAY_URL");

// PORT for runing server localy.
export const PORT = 7777;

// Production vars.
export const PRODUCTION = Deno.env.get("PRODUCTION");

// Restrictions. Here you can setup restrictions for your routes.
export const RESTRICTEDPATHES = [
    "/topics",
    "/quiz",
];

// Tests.
export const DENO_TEST = Deno.env.get("DENO_TEST");
