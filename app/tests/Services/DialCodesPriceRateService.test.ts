import DialCodesPriceRateService from "../../src/Services/DialCodesPriceRateService";
import DatabaseService from "../../src/Services/DatabaseService";
import dotenv from "dotenv";
import initialData from "./dialCodePriceTableinitialData.json";

dotenv.config();

describe("[Integration] getPriceRateTableData()", () =>
{
  describe("Post Conditions", () =>
  {
    test("Has expected data", async () =>
    {
      const client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
      const database = client.db(DatabaseService.telzirDatabaseName);
      const data = await DialCodesPriceRateService.getPriceRateTableData(database);
      const expectedData = initialData;

      expect(JSON.stringify(data)).toBe(JSON.stringify(expectedData));

      client.close();
    });
  });
});