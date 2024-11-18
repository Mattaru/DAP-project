import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { bcrypt } from "../../deps.js";
import * as userController from "../../routes/controllers/userController.js";
import * as mocks from "../mockUtils/mocks.js";


describe('POST /auth/login - userController.login', async () => {
	it('Login with valid user.', async () => {
		mocks.mockUserService.randomUser.password = await bcrypt.hash(mocks.mockUserService.randomPassword);
	
		const mockLogin = async (ctx) => {
			ctx.state.session = mocks.mockSession;
			await userController.login(ctx, undefined, mocks.mockUserService);
		};
	
		const app = mocks.getMockAppWithRouter("POST", "/auth/login", mockLogin);
	
		const request = await superoak(app);
		const response = await request
		.post("/auth/login")
		.send(`email=${mocks.mockUserService.randomUser.email}&password=${mocks.mockUserService.randomPassword}`);
	
		assertEquals(response.status, 302);
		assertEquals(response.get("location"), "/topics");
	});

	it('Login with invalid user.', async () => {
		mocks.mockUserService.randomUser.password = await bcrypt.hash(mocks.mockUserService.randomPassword);
	
		const mockLogin = async (ctx) => {
			ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
			ctx.state.session = mocks.mockSession;
			await userController.login(ctx, undefined, mocks.mockUserService);
		};
	
		const app = mocks.getMockAppWithRouter("POST", "/auth/login", mockLogin);
	
		const request = await superoak(app);
		const responseBad = await request
		.post("/auth/login")
		.send(`email=invalid-email&password=12`);
		
		assertEquals(responseBad.status, 200);
		assertEquals(responseBad.body.view, "./pages/users/login.eta");
		assertEquals(responseBad.body.data, {
			email: "invalid-email", 
			password: "12",
			validationErrors: {
				email: {
				    isEmail: "email is not a valid email address",
				},
				password: {
				    minLength: "password cannot be lower than 4 characters",
				},
			},
		});
	});
});

Deno.test("GET /auth/logout - userController.logout", async () => {
	const mockLogout = async (ctx) => {
		ctx.state.session = mocks.mockSession;
		await userController.logout(ctx);
	};

	const app = mocks.getMockAppWithRouter("GET", "/auth/logout", mockLogout);

	const request = await superoak(app);
	const response = await request.get("/auth/logout");

	assertEquals(response.status, 302);
	assertEquals(response.get("location"), "/auth/login");
	assertEquals(await mocks.mockSession.get("user"), null);
});


describe('POST /auth/register - userController.registration', async () => {
	it('Registration with valid data.', async () => {
		mocks.mockUserService.findUser = (email) => null;

		const mockRegistration = async (ctx) => {
			ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
			await userController.registration(ctx, undefined, mocks.mockUserService);
		};

		const app = mocks.getMockAppWithRouter("POST", "/auth/register", mockRegistration);

		const request = await superoak(app);
		const response = await request
		.post("/auth/register")
		.send(`email=${
			mocks.mockUserService.randomUser.email}&password=${
			mocks.mockUserService.randomPassword}&verification=${
			mocks.mockUserService.randomPassword}`);
		
		assertEquals(response.status, 302);
		assertEquals(response.get("location"), "/auth/login");
	});

	it('Registration with invalid data.', async () => {
		mocks.mockUserService.findUser = (email) => null;

		const mockRegistration = async (ctx) => {
			ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
			await userController.registration(ctx, undefined, mocks.mockUserService);
		};

		const app = mocks.getMockAppWithRouter("POST", "/auth/register", mockRegistration);

		const request = await superoak(app);
		const response = await request
		.post("/auth/register")
		.send(`email=invalid-email&password=12&verification=123`);
		
		assertEquals(response.status, 200);
		assertEquals(response.body.view, "./pages/users/register.eta");
		assertEquals(response.body.data, {
			email: "invalid-email",
			password: "12",
			verification: "123",
			validationErrors: {
			  email: { isEmail: "email is not a valid email address" },
			  password: { minLength: "password cannot be lower than 4 characters" },
			  verification: { notEqual: "the value does not match the password" }
			}
		});
	});
});

Deno.test("GET /auth/login - userController.viewLogin", async () => {
	const mockViewLogin = async (ctx) => {
		ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
		await userController.viewLogin(ctx);
	};

	const app = mocks.getMockAppWithRouter("GET", "/auth/login", mockViewLogin);

	const request = await superoak(app);
	const response = await request.get("/auth/login");

	assertEquals(response.status, 200);
	assertEquals(response.body.view, "./pages/users/login.eta");
});

Deno.test("GET /auth/register - userController.viewRegistration", async () => {
	const mockViewRegistration = async (ctx) => {
		ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
		await userController.viewRegistration(ctx);
	}

	const app = mocks.getMockAppWithRouter("GET", "/auth/register", mockViewRegistration);

	const request = await superoak(app);
	const response = await request.get("/auth/register");

	assertEquals(response.status, 200);
	assertEquals(response.body.view, "./pages/users/register.eta");
});