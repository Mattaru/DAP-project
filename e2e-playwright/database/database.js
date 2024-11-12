import { Pool } from "pg";


const CONCURRENT_CONNECTIONS = 10;
const connectionPool = new Pool({
    connectionString: process.env.PGURL,
    max: CONCURRENT_CONNECTIONS
});

export const executeQuery = async (query, params) => {
    const response = {};
    let client;
    try {
        client = await connectionPool.connect();
        const result = await client.query(query, params);

        if (result.rows) response.rows = result.rows;
    } catch (e) {
        response.error = e;
    } finally {
        if (client) {
            try {
                client = await connectionPool.connect();
            } catch (e) {
                console.error("Failed to connect to the database:", e);
            }
        }  
    }

    return response;
};
