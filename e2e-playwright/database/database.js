export { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";


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
        const result = await client.query(query, [params]);

        if (result.rows) response.rows = result.rows;
    } catch (e) {
        response.error = e;
    } finally {
        try { 
            client.release();
        } catch (e) {
            console.error('Error releasing client:', e);
        }
    }

    return response;
};
