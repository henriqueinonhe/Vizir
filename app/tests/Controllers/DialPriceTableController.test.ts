import expectedData from "../Services/dialCodePriceTableInitialData.json";
import DialCodePriceTableController from "../../src/Controllers/DialCodePriceTableController";

describe("[Integration] getPriceRateTable()", () =>
{
  describe("Post Conditions", () =>
  {
    test("Happy path", async () =>
    {
      const receivedData = await DialCodePriceTableController.getPriceRateTableData() as Array<{fromDialCode : number; toDialCode : number; priceRate : number}>;
      const projectedData = receivedData.map(({fromDialCode, toDialCode, priceRate}) => ({fromDialCode, toDialCode, priceRate}));
      expect(JSON.stringify(projectedData)).toBe(JSON.stringify(expectedData));
    });
  });
});