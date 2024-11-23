// API.
// Cross-Origin Resource Sharing settings for your API
export const CORS = {
    origin: "*", // Allow all origins
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Allow common methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow common headers
    credentials: false, // Disallow credentials (cookies, etc.) by default
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
