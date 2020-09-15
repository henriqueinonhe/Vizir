import UsageDataReportController from "../../src/Controllers/UsageDataReportController";

describe("[Integration] sendUsageData()", () =>
{
  describe("Post Conditions", () =>
  {
    test("Data is sent and receives confirmation response", async () =>
    {
      const data = await UsageDataReportController.sendUsageData("19", "11", "32", "FaleMais60");
      expect(data).toStrictEqual({
        fromDialCode: "19", 
        toDialCode: "11",
        dialLength: "32",
        faleMaisPlan: "FaleMais60"
      });
    });
  });
});