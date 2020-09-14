import "expect-puppeteer";

describe("[UI] Page Initial State (Static)", () =>
{
  beforeAll(async () => 
  {
    await page.goto("http://localhost:3000");
  });

  test(`Title is "Telzir"`, async () =>
  {
    await expect(page.title()).resolves.toBe("Telzir");
  });

  test(`There is a single h1 whose content is "Telzir", its color is #111 and font size is 32px`, async () =>
  {
    const matchedElements = await page.$$("h1");

    expect(matchedElements.length).toBe(1);
    await expect(matchedElements[0].evaluate(element => element.textContent)).resolves.toBe("Telzir");
    await expect(matchedElements[0].evaluate(element => (element as HTMLHeadingElement).style.fontSize)).resolves.toBe("32px");
    await expect(matchedElements[0].evaluate(element => (element as HTMLHeadingElement).style.color)).resolves.toBe("#111");
  });

});
