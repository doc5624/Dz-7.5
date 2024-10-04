const { clickElement, getText, selectSeat } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("Ticket booking tests", () => {
  test("Should successfully book one ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(page, "a.movie-seances__time");
    const seatSelector =
      "div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(4)";
    await clickElement(page, seatSelector);
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toEqual(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should successfully book two tickets", async () => {
    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(page, "a.movie-seances__time");
    const seatSelector =
      "div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(2)";
    await clickElement(page, seatSelector);
    const seatSelector2 =
      "div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(3)";
    await clickElement(page, seatSelector2);
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toEqual(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test.only("Should unsuccessfully book already booked ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(5)");
    await clickElement(page, "a.movie-seances__time");
    const seatSelector =
      "div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(2)";
    await clickElement(page, seatSelector);
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
