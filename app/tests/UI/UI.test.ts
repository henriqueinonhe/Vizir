import "expect-puppeteer";

beforeAll(async () => 
{
  await page.goto("http://localhost:3000");
});

describe("[UI] Page Initial State (Static)", () =>
{
  test(`Title is "Telzir"`, async () =>
  {
    await expect(page.title()).resolves.toBe("Telzir");
  });

  test(`H1`, async () =>
  {
    const matchedElements = await page.$$("h1");
    expect(matchedElements.length).toBe(1);

    const h1 = matchedElements[0];
    await expect(h1.evaluate(element => element.textContent)).resolves.toBe("Telzir");
    await expect(h1.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(17, 17, 17)");
    await expect(h1.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("32px");
    await expect(h1.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
  });

  describe(`Inside form`, () =>
  {
    test(`H2`, async () =>
    {
      const matchedElements = await page.$$("#PriceCalculatorTitle");
      expect(matchedElements.length).toBe(1);

      const h2 = matchedElements[0];
      await expect(h2.evaluate(element => element.textContent)).resolves.toBe("Compare os Preços!");
      await expect(h2.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(h2.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("24px");
      await expect(h2.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
    });

    test(`"DDD de Origem" input`, async () =>
    {
      const container = (await page.$("#FromDialCodeInputContainer"))!;
      const label = (await container.$("label"))!;
      const input = (await container.$("input"))!;

      //Label
      await expect(label.evaluate(element => element.textContent)).resolves.toBe("DDD de Origem");
      await expect(label.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(label.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(label.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      //Input
      await expect(input.evaluate(element => (element as HTMLInputElement).type)).resolves.toBe("number");
      await expect(input.evaluate(element => (element as HTMLInputElement).value)).resolves.toBe("11");
      await expect(input.evaluate(element => (element as HTMLInputElement).min)).resolves.toBe("0");
      await expect(input.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(input.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(input.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
    });

    test(`"DDD de Destino" input`, async () =>
    {
      const container = (await page.$("#ToDialCodeInputContainer"))!;
      const label = (await container.$("label"))!;
      const input = (await container.$("input"))!;

      //Label
      await expect(label.evaluate(element => element.textContent)).resolves.toBe("DDD de Destino");
      await expect(label.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(label.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(label.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      //Input
      await expect(input.evaluate(element => (element as HTMLInputElement).type)).resolves.toBe("number");
      await expect(input.evaluate(element => (element as HTMLInputElement).value)).resolves.toBe("16");
      await expect(input.evaluate(element => (element as HTMLInputElement).min)).resolves.toBe("0");
      await expect(input.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(input.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(input.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
    });

    test(`"Duração da Ligação (Minutos)" input`, async () =>
    {
      const container = (await page.$("#DialLengthInputContainer"))!;
      const label = (await container.$("label"))!;
      const input = (await container.$("input"))!;

      //Label
      await expect(label.evaluate(element => element.textContent)).resolves.toBe("Duração da Ligação (Minutos)");
      await expect(label.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(label.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(label.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      //Input
      await expect(input.evaluate(element => (element as HTMLInputElement).type)).resolves.toBe("number");
      await expect(input.evaluate(element => (element as HTMLInputElement).value)).resolves.toBe("0");
      await expect(input.evaluate(element => (element as HTMLInputElement).min)).resolves.toBe("0");
      await expect(input.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(input.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(input.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
    });

    test(`"Plano (FaleMais)" select`, async () =>
    {
      const container = (await page.$("#FaleMaisPlanInputContainer"))!;
      const label = (await container.$("label"))!;
      const select = (await container.$("select"))!;

      //Label
      await expect(label.evaluate(element => element.textContent)).resolves.toBe("Plano (FaleMais)");
      await expect(label.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(label.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(label.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      //Select
      await expect(select.evaluate(element => (element as HTMLSelectElement).type)).resolves.toBe("select-one");
      await expect(select.evaluate(element => (element as HTMLSelectElement).value)).resolves.toBe("FaleMais30");
      await expect(select.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(select.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(select.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      //Options
      const options = await select.$$("option");
      expect(options.length).toBe(3);

      const faleMais30Option = options[0];
      await expect(faleMais30Option.evaluate(element => element.textContent)).resolves.toBe("FaleMais30");
      await expect(faleMais30Option.evaluate(element => (element as HTMLOptionElement).value)).resolves.toBe("FaleMais30");
      await expect(faleMais30Option.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(faleMais30Option.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(faleMais30Option.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      const faleMais60Option = options[1];
      await expect(faleMais60Option.evaluate(element => element.textContent)).resolves.toBe("FaleMais60");
      await expect(faleMais60Option.evaluate(element => (element as HTMLOptionElement).value)).resolves.toBe("FaleMais60");
      await expect(faleMais60Option.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(faleMais60Option.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(faleMais60Option.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");

      const faleMais120Option = options[2];
      await expect(faleMais120Option.evaluate(element => element.textContent)).resolves.toBe("FaleMais120");
      await expect(faleMais120Option.evaluate(element => (element as HTMLOptionElement).value)).resolves.toBe("FaleMais120");
      await expect(faleMais120Option.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(faleMais120Option.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(faleMais120Option.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
    });

    test("Calcular button", async () =>
    {
      const button = (await page.$("#CalculateButton"))!;

      await expect(button.evaluate(element => element.textContent)).resolves.toBe("Calcular");
      await expect(button.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
      await expect(button.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(255, 255, 255)");
      await expect(button.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
    });

    test("Com FaleMais Display", async () =>
    {
      const container = (await page.$("#ComFaleMaisDisplayContainer"))!;
      const label = (await container.$$("span"))[0]!;
      const display = (await container.$$("span"))[1]!;

      //Container
      await expect(container.evaluate(element => window.getComputedStyle(element).border)).resolves.toBe("1px dashed rgb(25, 160, 102)");

      //Label
      await expect(label.evaluate(element => element.textContent)).resolves.toBe("Com FaleMais");
      await expect(label.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(124, 222, 180)");
      await expect(label.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
      await expect(label.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");

      //Display
      await expect(display.evaluate(element => element.textContent)).resolves.toBe("Indisponível");
      await expect(display.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(245, 66, 87)");
      await expect(display.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
      await expect(display.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
    });

    test("Sem FaleMais Display", async () =>
    {
      const container = (await page.$("#SemFaleMaisDisplayContainer"))!;
      const label = (await container.$$("span"))[0]!;
      const display = (await container.$$("span"))[1]!;

      //Container
      await expect(container.evaluate(element => window.getComputedStyle(element).border)).resolves.toBe("0px none rgb(255, 255, 255)");

      //Label
      await expect(label.evaluate(element => element.textContent)).resolves.toBe("Sem FaleMais");
      await expect(label.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(124, 222, 180)");
      await expect(label.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
      await expect(label.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");

      //Display
      await expect(display.evaluate(element => element.textContent)).resolves.toBe("Indisponível");
      await expect(display.evaluate(element => window.getComputedStyle(element).color)).resolves.toBe("rgb(245, 66, 87)");
      await expect(display.evaluate(element => window.getComputedStyle(element).fontSize)).resolves.toBe("16px");
      await expect(display.evaluate(element => window.getComputedStyle(element).textAlign)).resolves.toBe("center");
    });
  });

});

describe("[UI] Page Interactions", () =>
{
  test("Price calc", async () =>
  {
    const fromDialCodeInput = (await page.$("#FromDialCodeInputContainer>input"))!;
    const toDialCodeInput = (await page.$("#ToDialCodeInputContainer>input"))!;
    const dialLengthInput = (await page.$("#DialLengthInputContainer>input"))!;
    const faleMaisPlanInput = (await page.$("#FaleMaisPlanInputContainer>select"))!;
    const calculateButton = (await page.$("#CalculateButton"))!;
    const comFaleMaisDisplay = (await page.$("#ComFaleMaisDisplay"))!;
    const semFaleMaisDisplay = (await page.$("#SemFaleMaisDisplay"))!;

    const dataList = [
      {
        fromDialCode: "11", 
        toDialCode: "16", 
        dialLength: "20", 
        plan: "FaleMais30", 
        comFaleMais: "R$\xa00,00", 
        semFaleMais: "R$\xa038,00"
      },
      {
        fromDialCode: "11", 
        toDialCode: "17", 
        dialLength: "80", 
        plan: "FaleMais60", 
        comFaleMais: "R$\xa037,40", 
        semFaleMais: "R$\xa0136,00"
      },
      {
        fromDialCode: "18", 
        toDialCode: "11", 
        dialLength: "200", 
        plan: "FaleMais120", 
        comFaleMais: "R$\xa0167,20", 
        semFaleMais: "R$\xa0380,00"
      },
      {
        fromDialCode: "18", 
        toDialCode: "17", 
        dialLength: "80", 
        plan: "FaleMais30", 
        comFaleMais: "Indisponível", 
        semFaleMais: "Indisponível"
      }
    ];

    for(const data of dataList)
    {
      await fromDialCodeInput.click({clickCount: 3});
      await fromDialCodeInput.type(data.fromDialCode);
      await toDialCodeInput.click({clickCount: 3});
      await toDialCodeInput.type(data.toDialCode);
      await dialLengthInput.click({clickCount: 3});
      await dialLengthInput.type(data.dialLength);
      await faleMaisPlanInput.click();
      await faleMaisPlanInput.select(data.plan);
      await calculateButton.click();
      await expect(comFaleMaisDisplay.evaluate(element => element.textContent)).resolves.toBe(data.comFaleMais);
      await expect(semFaleMaisDisplay.evaluate(element => element.textContent)).resolves.toBe(data.semFaleMais);
    }

  });
});
