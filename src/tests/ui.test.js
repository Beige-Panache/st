const puppeteer = require('puppeteer');

describe('UI Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should display Hello, World!', async () => {
    await page.goto('http://localhost:3000');
    const text = await page.$eval('body', (element) => element.textContent);
    expect(text).toBe('Hello, World!');
  });

  afterAll(async () => {
    await browser.close();
  });
});
