import DatabaseService from "../../src/Services/DatabaseService";
import UsageDataReportService from "../../src/Services/UsageDataReportService";
import dotenv from "dotenv";
import MongoDB from "mongodb";

dotenv.config();
let client : MongoDB.MongoClient;
let database : MongoDB.Db;

beforeAll(async () =>
{
  client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
  database = client.db(DatabaseService.telzirDatabaseName);
  await database.dropCollection("usageData");
});

afterEach(async () =>
{
  await database.dropCollection("usageData");
});

afterAll(async () =>
{
  await client.close();
});


describe("[Integration] storeUsageData", () =>
{
  describe("Post Conditions", () =>
  {
    test("Stores usage data sucessfully", async () =>
    {
      await expect(database.collection(UsageDataReportService.usageDataCollectionName).find({}).toArray()).resolves.toStrictEqual([]);

      await UsageDataReportService.storeUsageData("192.168.1.1", "11", "12", "60", "FaleMais30");
      const storedData = await database.collection(UsageDataReportService.usageDataCollectionName).find({}).project({_id: 0, hashedClientIp: 0, timestamp: 0}).toArray();
      expect(storedData).toStrictEqual([
        {
          fromDialCode: "11",
          toDialCode: "12",
          dialLength: "60",
          faleMaisPlan: "FaleMais30"
        }
      ]);
    });
  });
});
