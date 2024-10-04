const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(50000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 3000 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", { timeout: 10000 }, async function (string) {
  return await this.page.goto(`${string}`);
});

When(
  "user choose day",
  async function () {
    return await clickElement(this.page, ".page-nav > a:nth-child(3)");
  },
  3000
);

When("user choose time", async function () {
  await clickElement(this.page, "a.movie-seances__time");
});

When(
  "user select 1 row 5 seat",
  async function () {
    await clickElement(
      this.page,
      "div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(5)"
    );
  },
  3000
);

When("user select 1 row 7 seat", async function () {
  await clickElement(
    this.page,
    "div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(7)"
  );
});

When("user select 1 row 6 seat", async function () {
  await clickElement(
    this.page,
    "div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(6)"
  );
});

When("user select the booked place", async function () {
  await clickElement(
    this.page,
    "div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(6)"
  );
});

When("user click button", async function () {
  await clickElement(this.page, "button.acceptin-button");
});

When("user click receive QR", async function () {
  await clickElement(this.page, "button.acceptin-button");
});

Then("user see text {string}", async function (string) {
  const actual = await getText(this.page, " p.ticket__hint");
  const expected = await string;
  expect(actual).toContain(expected);
});

Then("user see button disabled {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).toContain(expected);
});
