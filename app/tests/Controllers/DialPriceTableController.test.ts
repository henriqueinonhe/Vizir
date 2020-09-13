import expectedData from "../Services/dialCodePriceTableInitialData.json";
import DialCodePriceTableController from "../../src/Controllers/DialCodePriceTableController";

describe("[Integration] getPriceRateTable()", () =>
{
  describe("Post Conditions", () =>
  {
    test("Happy path", async () =>
    {
      const receivedData = JSON.stringify(await DialCodePriceTableController.getPriceRateTableData());
      expect(receivedData).toBe(JSON.stringify(expectedData));
    });
  });
});