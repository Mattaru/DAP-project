import { Application, oakCors, Session } from "./deps.js";
import * as config from "./config/config.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { router } from "./routes/routes.js";


export const app = new Application();

app.use(oakCors(config.CORS));

app.use(Session.initMiddleware());
app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(router.routes());
