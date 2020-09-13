import DatabaseService from "../../src/Services/DatabaseService";
import dotenv from "dotenv";

dotenv.config();

describe("[Integration] connect()", () =>
{
  describe("Pre Conditions", () =>
  {
    test("Connection must be successful", async () => 
    {
      await expect(DatabaseService.connect("wrong URI")).rejects.toThrow();
    });
  });

  describe("Post Conditions", () =>
  {
    test("Happy path", async () =>
    {
      const client = await DatabaseService.connect(process.env.DB_URI!);
      const dbName = client.db("telzir").databaseName;
      expect(dbName).toBe("telzir");

      await client.close();
    });
  });
});

describe("[Integration] getTelzirDatabase()", () =>
{
  describe("Pre Conditions", () =>
  {
    test("Connection must be successfull", async () =>
    {
      await expect(DatabaseService.getTelzirDatabase("wrong URI")).rejects.toThrow();
    });
  });

  describe("Post Conditions", () =>
  {
    test("Happy path", async () =>
    {
      const client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
      const dbName = client.db("telzir").databaseName;
      expect(dbName).toBe("telzir");

      //Calling database again retrieves same instance
      const newClient = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
      expect(client).toBe(newClient);

      await client.close();
    });
  });
});