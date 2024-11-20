module.exports = {
  timeout: 10000,
  retries: 0,
  reporter: "list",
  workers: 5,
  use: {
    baseURL: "http://drill-and-practice:7777",
    headless: true,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "e2e-headless-chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
};
