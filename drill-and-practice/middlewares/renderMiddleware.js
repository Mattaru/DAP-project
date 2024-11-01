import { configure, renderFile } from "../deps.js";


configure({
  views: `${Deno.cwd()}/views/`,
});

const renderMiddleware = async (ctx, next) => {
  ctx.render = async (file, data) => {
    if (!data) data = {};
    
    if (ctx.user) data.user = ctx.user;

    ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
    ctx.response.body = await renderFile(file, data);
  };

  await next();
};


export { renderMiddleware };