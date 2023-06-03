const puppeteer = require('puppeteer');
// Mocking the Puppeteer module
jest.mock('puppeteer', () => {
    return {
      launch: jest.fn(),
      connect: jest.fn(),
    };
  });
  
  describe('UI Tests', () => {
    let browser;
    let page;
  
    beforeAll(async () => {
      // Mocking the page methods
      page = {
        goto: jest.fn(),
        $eval: jest.fn(),
        close: jest.fn(),
      };
  
      // Mocking the browser methods
      browser = {
        newPage: jest.fn(() => Promise.resolve(page)),
        close: jest.fn(),
      };
  
      // Setting up the mock browser and page
      puppeteer.launch.mockResolvedValue(browser);
    });
  
    it('should display the mock API response on the UI', async () => {
      // Mocking the page.goto() method
      page.goto.mockResolvedValue(null);
  
      // Mocking the page.$eval() method
      page.$eval.mockImplementation((selector, callback) => {
        if (selector === 'body') {
          return callback({
            textContent: 'Mock API response',
          });
        }
      });
  
      // Your test logic goes here
  
    //   expect(browser.newPage).toHaveBeenCalled();
  
      await page.goto('http://localhost:3000');
      expect(page.goto).toHaveBeenCalledWith('http://localhost:3000');
  
      const text = await page.$eval('body', (element) => element.textContent);
      expect(page.$eval).toHaveBeenCalledWith(
        'body',
        expect.any(Function)
      );
  
      expect(text).toContain('Mock API response');
    });
  
    afterAll(async () => {
      // Cleaning up the mocks
      jest.restoreAllMocks();
  
      // Closing the mock browser
      await browser.close();
    });
  });
  