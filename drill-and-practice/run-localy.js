import { app } from "./app.js";
import * as config from "./config/config.js";


app.listen({ port: config.PORT });
