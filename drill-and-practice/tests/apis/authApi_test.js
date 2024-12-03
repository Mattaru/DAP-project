import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as authApi from "../../routes/apis/authApi.js";
import * as mocks from "../mockUtils/mocks.js";


describe('TEST API - authApi', async () => {
    describe('GET /api/auth/dashboard - authApi.dashboard', async () => {
        it('User is authorized.', async () => {
            const mockDashboard = async (ctx) => {
                ctx.state.session = mocks.mockSession;
                ctx.state.session.set("user", mocks.mockUsers.regularUser.email);
                await authApi.dashboard(ctx);
            };

            const app = mocks.getMockAppWithRouter("GET", "/api/auth/dashboard", mockDashboard);

            const request = await superoak(app);
            const response = await request.get("/api/auth/dashboard");
            
            assertEquals(response.status, 200);
            assertEquals(response.body, {user: mocks.mockUsers.regularUser.email});
        });
        
        it('User is not authorized.', async () => {
            const mockDashboard = async (ctx) => {
                ctx.state.session = mocks.mockSession;
                ctx.state.session.deleteSession();
                await authApi.dashboard(ctx);
            };

            const app = mocks.getMockAppWithRouter("GET", "/api/auth/dashboard", mockDashboard);

            const request = await superoak(app);
            const response = await request.get("/api/auth/dashboard");
            
            assertEquals(response.status, 401);
            assertEquals(response.body, {message: "Unauthorized"});
        });
    });

    describe('POST /api/auth/login - authApi.login', async () => {
        it('Login successful.', async () => {
            const mockLogin = async (ctx) => {
                ctx.state.session = mocks.mockSession;
                await authApi.login(ctx, undefined, mocks.mockUserService);
            };

            const app = mocks.getMockAppWithRouter("POST", "/api/auth/login", mockLogin);

            const request = await superoak(app);
            const response = await request
            .post("/api/auth/login")
            .send({
                email: mocks.mockUserService.randomUser.email,
                password: mocks.mockUserService.randomUser.passswordNotHashed
            });
            
            assertEquals(response.status, 200);
            assertEquals(response.body, {message: "Login successful"});
        });

        it('Login is not successful.', async () => {
            const mockLogin = async (ctx) => {
                ctx.state.session = mocks.mockSession;
                await authApi.login(ctx, undefined, mocks.mockUserService);
            };

            const app = mocks.getMockAppWithRouter("POST", "/api/auth/login", mockLogin);

            const request = await superoak(app);
            const response = await request
            .post("/api/auth/login")
            .send({
                email: mocks.mockUserService.randomUser.email,
                password: "wrong-passsword"
            });

            assertEquals(response.status, 401);
            assertEquals(response.body, {
                errors: {
                    password: {
                        notValidPassword: "password is not valid",
                    },
                },
            });
        });
    });

    it('POST /api/auth/logout - authApi.logOut', async () => {
        const mockLogOut = async (ctx) => {
            ctx.state.session = mocks.mockSession;
            await authApi.logOut(ctx);
        };

        const app = mocks.getMockAppWithRouter("POST", "/api/auth/logout", mockLogOut);

        const request = await superoak(app);
        const response = await request
        .post("/api/auth/logout");

        assertEquals(response.status, 200);
        assertEquals(response.body, {message: "Logged out successfully"});
    });

    describe('POST /api/auth/register - authApi.registration', async () => {
        it('Successful registration.', async () => {
            mocks.mockUserService.findUser = mocks.mockUserService.returnNull;

            const mockRegistration = async (ctx) => {
                await authApi.registration(ctx, undefined, mocks.mockUserService);
            };

            const app = mocks.getMockAppWithRouter("POST", "/api/auth/register", mockRegistration);

            const request = await superoak(app);
            const response = await request
            .post("/api/auth/register")
            .send({
                email: mocks.mockUserService.randomEmail,
                password: mocks.mockUserService.randomPassword,
                verification: mocks.mockUserService.randomPassword,
            });

            assertEquals(response.status, 201);
            assertEquals(response.body, {message: "User registered successfully"});
        });

        it('Unsuccessful registration.', async () => {
            mocks.mockUserService.findUser = mocks.mockUserService.returnRandomUser;

            const mockRegistration = async (ctx) => {
                await authApi.registration(ctx, undefined, mocks.mockUserService);
            };

            const app = mocks.getMockAppWithRouter("POST", "/api/auth/register", mockRegistration);

            const request = await superoak(app);
            const response = await request
            .post("/api/auth/register")
            .send({
                email: mocks.mockUserService.randomUser.email,
                password: mocks.mockUserService.randomUser.passswordNotHashed,
                verification: mocks.mockUserService.randomUser.passswordNotHashed,
            });

            assertEquals(response.status, 401);
            assertEquals(response.body, {
                    errors: {
                        email: {
                            alreadyExists: "this email already exists",
                        },
                    },
                });
        });
    });
});
