import { Pool } from "../deps.js";


const DATABASE_URL = Deno.env.get("DATABASE_URL");
const FLYWAY_URL = Deno.env.get("FLYWAY_URL");
const DENO_TEST = Deno.env.get("DENO_TEST");
const CONCURRENT_CONNECTIONS = 10;
let connectionPool;

if (!DENO_TEST) {
  if (DATABASE_URL) 
    connectionPool = new Pool(DATABASE_URL,CONCURRENT_CONNECTIONS, true);
  else if (FLYWAY_URL) 
    connectionPool = new Pool(FLYWAY_URL, CONCURRENT_CONNECTIONS, true);
  else
    connectionPool = new Pool({}, CONCURRENT_CONNECTIONS, true);  
}

export const executeQuery = async (query, params) => {
  if (!connectionPool) return { rows: [] };

  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);

    if (result.rows) response.rows = result.rows;
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};
