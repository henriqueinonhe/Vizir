import DialPriceCalculator, { faleMaisPlanMinutes, FaleMaisPlan } from "../../src/Models/DialPriceCalculator";
import { DineroReal } from "../../src/Utils/Utils";
import DialCodePriceRateTable from "../../src/Models/DialCodePriceRateTable";

describe("[Unit] faleMaisPlanMinutes()", () =>
{
  describe("Pre Conditions", () =>
  {
    test("The plan must have a minutes limit associated with it", () =>
    {
      //Pass
      expect(() => faleMaisPlanMinutes(FaleMaisPlan.FaleMais30)).not.toThrow();
      expect(() => faleMaisPlanMinutes(FaleMaisPlan.FaleMais60)).not.toThrow();
      expect(() => faleMaisPlanMinutes(FaleMaisPlan.FaleMais120)).not.toThrow();
    });
  });

  describe("Post Conditions", () =>
  {
    test("Happy path", () =>
    {
      expect(faleMaisPlanMinutes(FaleMaisPlan.FaleMais30)).toBe(30);
      expect(faleMaisPlanMinutes(FaleMaisPlan.FaleMais60)).toBe(60);
      expect(faleMaisPlanMinutes(FaleMaisPlan.FaleMais120)).toBe(120);
    });
  });
});

describe("[Unit] defaultPrice()", () =>
{
  const rateTableData = new Map<number, Map<number, Dinero.Dinero | null>>();

  rateTableData.set(11, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(11)!.set(11, DineroReal(0));
  rateTableData.get(11)!.set(16, DineroReal(190e2));
  rateTableData.get(11)!.set(17, DineroReal(170e2));
  rateTableData.get(11)!.set(18, DineroReal(90e2));

  rateTableData.set(16, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(16)!.set(11, DineroReal(290e2));
  rateTableData.get(16)!.set(16, null);
  rateTableData.get(16)!.set(17, null);
  rateTableData.get(16)!.set(18, null);

  rateTableData.set(17, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(17)!.set(11, DineroReal(270e2));
  rateTableData.get(17)!.set(16, null);
  rateTableData.get(17)!.set(17, null);
  rateTableData.get(17)!.set(18, null);

  rateTableData.set(18, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(18)!.set(11, DineroReal(190e2));
  rateTableData.get(18)!.set(16, null);
  rateTableData.get(18)!.set(17, null);
  rateTableData.get(18)!.set(18, null);

  const rateTable = new DialCodePriceRateTable(rateTableData);

  describe("Pre Conditions", () =>
  {
    test("fromDialCode must be valid", () =>
    {
      expect(() => DialPriceCalculator.defaultPrice(rateTable, 10, 11, 100)).toThrow(`"10" is not a valid dial code!`);
    });

    test("fromDialCode must be valid", () =>
    {
      expect(() => DialPriceCalculator.defaultPrice(rateTable, 11, 19, 100)).toThrow(`"19" is not a valid dial code!`);
    });

    test("dialLengthInMinutes must be a non-negative integer", () =>
    {
      expect(() => DialPriceCalculator.defaultPrice(rateTable, 11, 19, -10)).toThrow(`dialLengthInMinutes (-10) must be a non-negative integer!`);
      expect(() => DialPriceCalculator.defaultPrice(rateTable, 11, 19, 3.1415)).toThrow(`dialLengthInMinutes (3.1415) must be a non-negative integer!`);
    });
  });

  describe("Post Conditions", () =>
  {
    test("Non Null rates", () =>
    {
      expect(DialPriceCalculator.defaultPrice(rateTable, 11, 16, 20)!.toFormat()).toBe("R$38.00");
      expect(DialPriceCalculator.defaultPrice(rateTable, 11, 17, 80)!.toFormat()).toBe("R$136.00");
      expect(DialPriceCalculator.defaultPrice(rateTable, 18, 11, 200)!.toFormat()).toBe("R$380.00");
    });

    test("Null rates", () =>
    {
      expect(DialPriceCalculator.defaultPrice(rateTable, 16, 17, 20)).toBe(null);
    });
  }); 
});

describe("[Unit] faleMaisPrice()", () =>
{
  const rateTableData = new Map<number, Map<number, Dinero.Dinero | null>>();

  rateTableData.set(11, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(11)!.set(11, DineroReal(0));
  rateTableData.get(11)!.set(16, DineroReal(190e2));
  rateTableData.get(11)!.set(17, DineroReal(170e2));
  rateTableData.get(11)!.set(18, DineroReal(90e2));

  rateTableData.set(16, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(16)!.set(11, DineroReal(290e2));
  rateTableData.get(16)!.set(16, null);
  rateTableData.get(16)!.set(17, null);
  rateTableData.get(16)!.set(18, null);

  rateTableData.set(17, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(17)!.set(11, DineroReal(270e2));
  rateTableData.get(17)!.set(16, null);
  rateTableData.get(17)!.set(17, null);
  rateTableData.get(17)!.set(18, null);

  rateTableData.set(18, new Map<number, Dinero.Dinero | null>());
  rateTableData.get(18)!.set(11, DineroReal(190e2));
  rateTableData.get(18)!.set(16, null);
  rateTableData.get(18)!.set(17, null);
  rateTableData.get(18)!.set(18, null);

  const rateTable = new DialCodePriceRateTable(rateTableData);

  describe("Pre Conditions", () =>
  {
    test("fromDialCode must be valid", () =>
    {
      expect(() => DialPriceCalculator.faleMaisPrice(rateTable, 10, 11, 100, FaleMaisPlan.FaleMais60)).toThrow(`"10" is not a valid dial code!`);
    });

    test("fromDialCode must be valid", () =>
    {
      expect(() => DialPriceCalculator.faleMaisPrice(rateTable, 11, 19, 100, FaleMaisPlan.FaleMais60)).toThrow(`"19" is not a valid dial code!`);
    });

    test("dialLengthInMinutes must be a non-negative integer", () =>
    {
      expect(() => DialPriceCalculator.faleMaisPrice(rateTable, 11, 18, -10, FaleMaisPlan.FaleMais60)).toThrow(`dialLengthInMinutes (-10) must be a non-negative integer!`);
      expect(() => DialPriceCalculator.faleMaisPrice(rateTable, 11, 18, 3.1415, FaleMaisPlan.FaleMais60)).toThrow(`dialLengthInMinutes (3.1415) must be a non-negative integer!`);
    });
  });

  describe("Post Conditions", () =>
  {
    test("Non null rates", () =>
    {
      expect(DialPriceCalculator.faleMaisPrice(rateTable, 11, 16, 20, FaleMaisPlan.FaleMais30)!.toFormat()).toBe("R$0.00");
      expect(DialPriceCalculator.faleMaisPrice(rateTable, 11, 17, 80, FaleMaisPlan.FaleMais60)!.toFormat()).toBe("R$37.40");
      expect(DialPriceCalculator.faleMaisPrice(rateTable, 18, 11, 200, FaleMaisPlan.FaleMais120)!.toFormat()).toBe("R$167.20");
    });

    test("Null rates", () =>
    {
      expect(DialPriceCalculator.faleMaisPrice(rateTable, 16, 17, 20, FaleMaisPlan.FaleMais120)).toBe(null);
    });
  });
});