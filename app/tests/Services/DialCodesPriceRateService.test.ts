import DialCodesPriceRateService from "../../src/Services/DialCodesPriceRateService";
import DatabaseService from "../../src/Services/DatabaseService";
import dotenv from "dotenv";
import expectedData from "./dialCodePriceTableinitialData.json";

dotenv.config();

describe("[Integration] getPriceRateTableData()", () =>
{
  describe("Post Conditions", () =>
  {
    test("Has expected data", async () =>
    {
      const client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
      const database = client.db(DatabaseService.telzirDatabaseName);
      const data = await DialCodesPriceRateService.getPriceRateTableData(database) as Array<{fromDialCode : number; toDialCode : number; priceRate : number}>;
      const projectedData = data.map(({fromDialCode, toDialCode, priceRate}) => ({fromDialCode, toDialCode, priceRate}));

      expect(JSON.stringify(projectedData)).toBe(JSON.stringify(expectedData));

      client.close();
    });
  });
}); 