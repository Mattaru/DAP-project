import { Pool } from "../deps.js";
import * as config from "../config/config.js";


let connectionPool;

if (config.PRODUCTION) {
  connectionPool = new Pool(config.DAP_DB_URL, config.CONCURRENT_CONNECTIONS, true);
} else if (!config.DENO_TEST) {
  if (config.DATABASE_URL) 
    connectionPool = new Pool(config.DATABASE_URL, config.CONCURRENT_CONNECTIONS, true);
  else if (config.FLYWAY_URL) 
    connectionPool = new Pool(config.FLYWAY_URL, config.CONCURRENT_CONNECTIONS, true);
  else
    connectionPool = new Pool({}, config.CONCURRENT_CONNECTIONS, true);  
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
