import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { Application, Router } from "../../deps.js";
import * as userController from "../../routes/controllers/userController.js";

const mockUserService = {
  addUser: async (email, hashedPassword) => ({ email, hashedPassword }),
};

const mockSession = {
  async set(key, value) {
    this[key] = value;
  },
  async get(key) {
    return this[key];
  },
  async deleteSession() {
    this.user = null;
  },
};



/* Deno.test("POST /auth/login - userController.login", async () => {
  const app = new Application();
  const router = new Router();

  router.post("/auth/login", async (ctx) => {
    ctx.state.session = mockSession;
    await userController.login(ctx);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request
    .post("/auth/login")
    .send("email=test@example.com&password=test1234");

  assertEquals(response.status, 302);
  assertEquals(response.headers.get("location"), "/topics");
  assertEquals(await mockSession.get("user"), {
    id: 1,
    email: "test@example.com",
    password: await bcrypt.hash("test1234"),
  });
}); */

/* Deno.test("GET /auth/logout - userController.logout", async () => {
  const app = new Application();
  const router = new Router();

  router.get("/auth/logout", async (ctx) => {
    ctx.state.session = mockSession;
    await userController.logout(ctx);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request.get("/auth/logout");

  assertEquals(response.status, 302);
  assertEquals(response.headers.get("location"), "/auth/login");
  assertEquals(await mockSession.get("user"), null);
});

Deno.test("POST /auth/register - userController.registration", async () => {
  const app = new Application();
  const router = new Router();

  router.post("/auth/register", async (ctx) => {
    ctx.state.session = mockSession;
    await userController.registration(ctx);
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = await superoak(app);
  const response = await request
    .post("/auth/register")
    .send("email=newuser@example.com&password=newpassword");

  assertEquals(response.status, 302);
  assertEquals(response.headers.get("location"), "/auth/login");
});

Deno.test("GET /auth/login - userController.viewLogin", async () => {
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