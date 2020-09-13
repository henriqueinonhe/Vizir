import DialCodePriceRateTable from "../../src/Models/DialCodePriceRateTable";
import Dinero from "dinero.js";
import { DineroReal } from "../../src/Utils/Utils";

describe("[Unit] constructor", () =>
{
  describe("Pre Conditions", () =>
  {
    describe("Every valid code must be present as a row", () =>
    {
      test("Single dial code missing", () =>
      {
        const tableData = new Map<number, Map<number, Dinero.Dinero | null>>();
  
        tableData.set(1, new Map<number, Dinero.Dinero | null>());
        tableData.get(1)!.set(1, DineroReal(0));
        tableData.get(1)!.set(2, DineroReal(130));
  
        expect(() => new DialCodePriceRateTable(tableData)).toThrow(`Dial codes "2" are valid, but are missing as rows!`);

        //Adding missing dial codes
        tableData.set(2, new Map<number, Dinero.Dinero | null>());
        tableData.get(2)!.set(1, DineroReal(130));
        tableData.get(2)!.set(2, null);

        expect(() => new DialCodePriceRateTable(tableData)).not.toThrow();
      });

      test("Multiple dial codes missing from different rows", () =>
      {
        const tableData = new Map<number, Map<number, Dinero.Dinero | null>>();

        tableData.set(1, new Map<number, Dinero.Dinero | null>());
        tableData.get(1)!.set(1, DineroReal(0));
        tableData.get(1)!.set(2, DineroReal(2));
        tableData.get(1)!.set(3, DineroReal(1));

        tableData.set(2, new Map<number, Dinero.Dinero | null>());
        tableData.get(2)!.set(1, DineroReal(2));
        tableData.get(2)!.set(2, DineroReal(0));
        tableData.get(2)!.set(3, null);
        tableData.get(2)!.set(4, null);
        tableData.get(2)!.set(5, DineroReal(3));

        expect(() => new DialCodePriceRateTable(tableData)).toThrow(`Dial codes "3", "4", "5" are valid, but are missing as rows!`);
        
        //Adding missing dial codes
        tableData.get(1)!.set(4, null);
        tableData.get(1)!.set(5, DineroReal(3));

        tableData.set(3, new Map<number, Dinero.Dinero | null>());
        tableData.get(3)!.set(1, DineroReal(2));
        tableData.get(3)!.set(2, DineroReal(0));
        tableData.get(3)!.set(3, null);
        tableData.get(3)!.set(4, null);
        tableData.get(3)!.set(5, DineroReal(3));
        
        tableData.set(4, new Map<number, Dinero.Dinero | null>());
        tableData.get(4)!.set(1, DineroReal(2));
        tableData.get(4)!.set(2, DineroReal(0));
        tableData.get(4)!.set(3, null);
        tableData.get(4)!.set(4, null);
        tableData.get(4)!.set(5, DineroReal(3));
        
        tableData.set(5, new Map<number, Dinero.Dinero | null>());
        tableData.get(5)!.set(1, DineroReal(2));
        tableData.get(5)!.set(2, DineroReal(0));
        tableData.get(5)!.set(3, null);
        tableData.get(5)!.set(4, null);
        tableData.get(5)!.set(5, DineroReal(3));

        expect(() => new DialCodePriceRateTable(tableData)).not.toThrow();
      });
    });

    describe("Every valid code must be present as a column for every row", () =>
    {
      test("", () =>
      {
        const tableData = new Map<number, Map<number, Dinero.Dinero | null>>();

        tableData.set(1, new Map<number, Dinero.Dinero | null>());
        tableData.get(1)!.set(1, DineroReal(1));

        tableData.set(2, new Map<number, Dinero.Dinero | null>());
        tableData.get(2)!.set(2, DineroReal(1));
        
        tableData.set(3, new Map<number, Dinero.Dinero | null>());
        tableData.get(3)!.set(3, DineroReal(1));

        tableData.set(4, new Map<number, Dinero.Dinero | null>());
        tableData.get(4)!.set(4, DineroReal(1));

        tableData.set(5, new Map<number, Dinero.Dinero | null>());
        tableData.get(5)!.set(5, DineroReal(1));

        expect(() => new DialCodePriceRateTable(tableData)).toThrow(`There are valid dial codes that are missing as columns!\nDial codes "2", "3", "4", "5" are missing from dial code row "1"\nDial codes "1", "3", "4", "5" are missing from dial code row "2"\nDial codes "1", "2", "4", "5" are missing from dial code row "3"\nDial codes "1", "2", "3", "5" are missing from dial code row "4"\nDial codes "1", "2", "3", "4" are missing from dial code row "5"`);

        //Adding missing dial codes
        tableData.get(1)!.set(2, DineroReal(0));
        tableData.get(1)!.set(3, DineroReal(1));
        tableData.get(1)!.set(4, DineroReal(1));
        tableData.get(1)!.set(5, DineroReal(3));

        tableData.get(2)!.set(1, DineroReal(0));
        tableData.get(2)!.set(3, DineroReal(1));
        tableData.get(2)!.set(4, DineroReal(1));
        tableData.get(2)!.set(5, DineroReal(3));

        tableData.get(3)!.set(1, DineroReal(0));
        tableData.get(3)!.set(2, DineroReal(1));
        tableData.get(3)!.set(4, DineroReal(1));
        tableData.get(3)!.set(5, DineroReal(3));

        tableData.get(4)!.set(1, DineroReal(0));
        tableData.get(4)!.set(2, DineroReal(1));
        tableData.get(4)!.set(3, DineroReal(1));
        tableData.get(4)!.set(5, DineroReal(3));

        tableData.get(5)!.set(1, DineroReal(0));
        tableData.get(5)!.set(2, DineroReal(1));
        tableData.get(5)!.set(3, DineroReal(1));
        tableData.get(5)!.set(4, DineroReal(3));

        expect(() => new DialCodePriceRateTable(tableData)).not.toThrow();
      });
    });

  });
});

describe("[Unit] getRate()", () =>
{
  const tableData = new Map<number, Map<number, Dinero.Dinero | null>>();

  tableData.set(11, new Map<number, Dinero.Dinero | null>());
  tableData.get(11)!.set(11, DineroReal(0));
  tableData.get(11)!.set(16, DineroReal(190e2));
  tableData.get(11)!.set(17, DineroReal(170e2));
  tableData.get(11)!.set(18, DineroReal(90e2));

  tableData.set(16, new Map<number, Dinero.Dinero | null>());
  tableData.get(16)!.set(11, DineroReal(290e2));
  tableData.get(16)!.set(16, null);
  tableData.get(16)!.set(17, null);
  tableData.get(16)!.set(18, null);

  tableData.set(17, new Map<number, Dinero.Dinero | null>());
  tableData.get(17)!.set(11, DineroReal(270e2));
  tableData.get(17)!.set(16, null);
  tableData.get(17)!.set(17, null);
  tableData.get(17)!.set(18, null);

  tableData.set(18, new Map<number, Dinero.Dinero | null>());
  tableData.get(18)!.set(11, DineroReal(190e2));
  tableData.get(18)!.set(16, null);
  tableData.get(18)!.set(17, null);
  tableData.get(18)!.set(18, null);

  const table = new DialCodePriceRateTable(tableData);

  describe("Pre Conditions", () =>
  {
    test("FromDialCode must be valid", () =>
    {
      expect(() => table.getRate(10, 11)).toThrow(`"10" is not a valid dial code!`);
    });

    test("ToDialCode must be valid", () =>
    {
      expect(() => table.getRate(11, 20)).toThrow(`"20" is not a valid dial code!`);
    });
  });

  describe("Post Conditions", () =>
  {
    test("Happy path", () =>
    {
      expect((table.getRate(11, 16) as Dinero.Dinero).equalsTo(DineroReal(190e2))).toBe(true);
      expect((table.getRate(16, 11) as Dinero.Dinero).equalsTo(DineroReal(290e2))).toBe(true);
      expect((table.getRate(11, 17) as Dinero.Dinero).equalsTo(DineroReal(170e2))).toBe(true);
      expect((table.getRate(17, 11) as Dinero.Dinero).equalsTo(DineroReal(270e2))).toBe(true);
      expect((table.getRate(11, 18) as Dinero.Dinero).equalsTo(DineroReal(90e2))).toBe(true);
      expect((table.getRate(18, 11) as Dinero.Dinero).equalsTo(DineroReal(190e2))).toBe(true);

      expect(table.getRate(16, 16)).toBe(null);
    });
  });
});

describe("[Unit] serialize()", () =>
{
  describe("Post Conditions", () =>
  {
    test("Happy path", () => 
    {
      const tableData = new Map<number, Map<number, Dinero.Dinero | null>>();

      tableData.set(11, new Map<number, Dinero.Dinero | null>());
      tableData.get(11)!.set(11, DineroReal(0));
      tableData.get(11)!.set(16, DineroReal(190e2));
      tableData.get(11)!.set(17, DineroReal(170e2));
      tableData.get(11)!.set(18, DineroReal(90e2));

      tableData.set(16, new Map<number, Dinero.Dinero | null>());
      tableData.get(16)!.set(11, DineroReal(290e2));
      tableData.get(16)!.set(16, null);
      tableData.get(16)!.set(17, null);
      tableData.get(16)!.set(18, null);

      tableData.set(17, new Map<number, Dinero.Dinero | null>());
      tableData.get(17)!.set(11, DineroReal(270e2));
      tableData.get(17)!.set(16, null);
      tableData.get(17)!.set(17, null);
      tableData.get(17)!.set(18, null);

      tableData.set(18, new Map<number, Dinero.Dinero | null>());
      tableData.get(18)!.set(11, DineroReal(190e2));
      tableData.get(18)!.set(16, null);
      tableData.get(18)!.set(17, null);
      tableData.get(18)!.set(18, null);

      const table = new DialCodePriceRateTable(tableData);

      expect(table.serialize()).toStrictEqual([
        { fromDialCode: 11, toDialCode: 11, priceRate: 0 },
        { fromDialCode: 11, toDialCode: 16, priceRate: 19000 },
        { fromDialCode: 11, toDialCode: 17, priceRate: 17000 },
        { fromDialCode: 11, toDialCode: 18, priceRate: 9000 },
        { fromDialCode: 16, toDialCode: 11, priceRate: 29000 },
        { fromDialCode: 16, toDialCode: 16, priceRate: null },
        { fromDialCode: 16, toDialCode: 17, priceRate: null },
        { fromDialCode: 16, toDialCode: 18, priceRate: null },
        { fromDialCode: 17, toDialCode: 11, priceRate: 27000 },
        { fromDialCode: 17, toDialCode: 16, priceRate: null },
        { fromDialCode: 17, toDialCode: 17, priceRate: null },
        { fromDialCode: 17, toDialCode: 18, priceRate: null },
        { fromDialCode: 18, toDialCode: 11, priceRate: 19000 },
        { fromDialCode: 18, toDialCode: 16, priceRate: null },
        { fromDialCode: 18, toDialCode: 17, priceRate: null },
        { fromDialCode: 18, toDialCode: 18, priceRate: null }
      ]);

    });
  });
});

describe("[Unit] deserialize()", () =>
{
  describe("Pre Conditions", () =>
  {
    test("Serialized data actually corresponds to a DialCodePriceRateTable", () =>
    {
      //Serialized data must be array
      expect(() => DialCodePriceRateTable.deserialize({fromDialCode: 2})).toThrow("Serialized DialCodePriceRateTable is expected to be an array!");
      expect(() => DialCodePriceRateTable.deserialize({})).toThrow("Serialized DialCodePriceRateTable is expected to be an array!");
      expect(() => DialCodePriceRateTable.deserialize(1)).toThrow("Serialized DialCodePriceRateTable is expected to be an array!");
      expect(() => DialCodePriceRateTable.deserialize("asdasasd")).toThrow("Serialized DialCodePriceRateTable is expected to be an array!");
      expect(() => DialCodePriceRateTable.deserialize(undefined)).toThrow("Serialized DialCodePriceRateTable is expected to be an array!");
      expect(() => DialCodePriceRateTable.deserialize(null)).toThrow("Serialized DialCodePriceRateTable is expected to be an array!");

      //Serialized data must have the right structure and data types
      expect(() => DialCodePriceRateTable.deserialize([{fromDialCode: 2}])).toThrow();
      expect(() => DialCodePriceRateTable.deserialize([{fromDialCode: null, toDialCode: 1, priceRate: 1000}])).toThrow();
      expect(() => DialCodePriceRateTable.deserialize([{fromDialCode: [], toDialCode: 1, priceRate: 1000}])).toThrow();
      expect(() => DialCodePriceRateTable.deserialize([{fromDialCode: {}, toDialCode: 1, priceRate: 1000}])).toThrow();
      expect(() => DialCodePriceRateTable.deserialize([{fromDialCode: "dobs", toDialCode: 1, priceRate: 1000}])).toThrow();
    });
  });

  describe("Post Conditions", () =>
  {
    test("Happy path", () =>
    {
      const serializedData = [
        { fromDialCode: 11, toDialCode: 11, priceRate: 0 },
        { fromDialCode: 11, toDialCode: 16, priceRate: 19000 },
        { fromDialCode: 11, toDialCode: 17, priceRate: 17000 },
        { fromDialCode: 11, toDialCode: 18, priceRate: 9000 },
        { fromDialCode: 16, toDialCode: 11, priceRate: 29000 },
        { fromDialCode: 16, toDialCode: 16, priceRate: null },
        { fromDialCode: 16, toDialCode: 17, priceRate: null },
        { fromDialCode: 16, toDialCode: 18, priceRate: null },
        { fromDialCode: 17, toDialCode: 11, priceRate: 27000 },
        { fromDialCode: 17, toDialCode: 16, priceRate: null },
        { fromDialCode: 17, toDialCode: 17, priceRate: null },
        { fromDialCode: 17, toDialCode: 18, priceRate: null },
        { fromDialCode: 18, toDialCode: 11, priceRate: 19000 },
        { fromDialCode: 18, toDialCode: 16, priceRate: null },
        { fromDialCode: 18, toDialCode: 17, priceRate: null },
        { fromDialCode: 18, toDialCode: 18, priceRate: null }
      ];

      expect(DialCodePriceRateTable.deserialize(serializedData).serialize()).toStrictEqual(serializedData);
    });
  });
});