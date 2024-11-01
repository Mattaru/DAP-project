import { send } from "../deps.js";


const serveStaticMiddleware = async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith("/static")) {
    const path = ctx.request.url.pathname.substring(7);

    await send(ctx, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};


export { serveStaticMiddleware };