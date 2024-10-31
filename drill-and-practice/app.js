import { Application } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { router } from "./routes/routes.js";


const app = new Application();

app.use(errorMiddleware);
app.use(renderMiddleware);
app.use(serveStaticMiddleware);
app.use(router.routes());


export { app };

app.listen({ port: 7777 });
