import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { Application, Router, bcrypt } from "../../deps.js";
import * as userController from "../../routes/controllers/userController.js";
import * as mocks from "../mockUtils/mocks.js";


Deno.test("POST /auth/login - userController.login", async () => {
  const app = new Application();
  const router = new Router();

  mocks.mockUserService.randomUser.password = await bcrypt.hash(mocks.mockUserService.randomPassword);

  router.post("/auth/login", async (ctx) => {
    ctx.render = (view, data) => mocks.render(ctx, view, data);
    ctx.state.session = mocks.mockSession;
    await userController.login(ctx, undefined, mocks.mockUserService);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request
  .post("/auth/login")
  .send(`email=${mocks.mockUserService.randomUser.email}.com&password=${mocks.mockUserService.randomPassword}`);

  assertEquals(response.status, 302);
  assertEquals(response.get("location"), "/topics");
});

Deno.test("GET /auth/logout - userController.logout", async () => {
  const app = new Application();
  const router = new Router();

  router.get("/auth/logout", async (ctx) => {
    ctx.state.session = mocks.mockSession;
    await userController.logout(ctx);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request.get("/auth/logout");

  assertEquals(response.status, 302);
  assertEquals(response.get("location"), "/auth/login");
  assertEquals(await mocks.mockSession.get("user"), null);
});

Deno.test("POST /auth/register - userController.registration", async () => {
  const app = new Application();
  const router = new Router();

  router.post("/auth/register", async (ctx) => {
    ctx.state.session = mocks.mockSession;
    await mocks.userController.registration(ctx, undefined, mocks.mockUserService);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request
    .post("/auth/register")
    .send(
      `email=${mocks.mockUserService.randomUser.email}
      &password=${mocks.mockUserService.randomPassword}
      &verification=${mocks.mockUserService.randomPassword}`
    );

  assertEquals(response.status, 302);
  assertEquals(response.get("location"), "/auth/login");
});

/* Deno.test("GET /auth/login - userController.viewLogin", async () => {
  const app = new Application();
  const router = new Router();

  router.get("/auth/login", async (ctx) => {
    ctx.render = (view, data) => {
      return { view, data };
    };
    await userController.viewLogin(ctx);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request.get("/auth/login");

  assertEquals(response.status, 200);
  assertEquals(response.body.view, "./pages/users/login.eta");
});

Deno.test("GET /auth/register - userController.viewRegistration", async () => {
  const app = new Application();
  const router = new Router();

  router.get("/auth/register", async (ctx) => {
    ctx.render = (view, data) => {
      return { view, data };
    };
    await userController.viewRegistration(ctx);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request.get("/auth/register");

  assertEquals(response.status, 200);
  assertEquals(response.body.view, "./pages/users/register.eta");
}); */