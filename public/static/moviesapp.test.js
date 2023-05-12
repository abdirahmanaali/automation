const {Builder, Browser, By, Key, until} = require("selenium-webdriver");

let driver;

beforeAll(async ()  => {
    driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterAll(async () => {
    await driver.quit();
});

const addMovie = async (movieTitle) => {
    await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys(movieTitle);
    await driver.findElement(By.css('button[type="submit"]')).click();
  };

  test("can mark a movie as watched", async () => {
    await driver.get("http://localhost:3000/");
  
    await addMovie("Avatar");
    const addedMovie = await driver.wait(
      until.elementLocated(By.css("#movies-list li")),
      1000
    );
    await addedMovie.findElement(By.css('input[type="checkbox"]')).click();
  });
  
test ('deleting a movie', async () => {
        await driver.get("http://localhost:3000");
        await addMovie("John Wick");
        const addedMovie = await driver.wait(
          until.elementLocated(By.css("#movies-list li")),
          1000
        );
        await addedMovie.findElement(By.css("button.delete-btn")).click();
        await driver.wait(until.stalenessOf(addedMovie), 20000);
});

test("notifications are displayed", async () => {
    await driver.get("http://localhost:3000/");
    await addMovie("Spider-Man");
    const addedMovie = await driver.wait(
        until.elementLocated(By.css("#movies-list li")), 1000);
        await addedMovie.findElement(By.css("button.delete-btn")).click();
        await driver.wait(
      until.elementTextContains(driver.findElement(By.id("message")), "deleted!"),
      1000
    );
  });