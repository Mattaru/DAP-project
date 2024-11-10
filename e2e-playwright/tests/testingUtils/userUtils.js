export const loginAsUser = async (page, user) => {
    await page.goto('http://localhost:7777/auth/login');
  
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
  
    await page.click('button[type="submit"]');
};

export const logOut = async (page) => {
    await page.click("a.nav-link[href='/auth/logout']");
};
