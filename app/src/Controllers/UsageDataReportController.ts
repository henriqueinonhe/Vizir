import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/usageData"
});

export default class UsageDataReportController
{
  public static async sendUsageData(fromDialCode : string, toDialCode : string, dialLength : string, faleMaisPlan : string) : Promise<void>
  {
    api.post("/", {
      fromDialCode,
      toDialCode,
      dialLength,
      faleMaisPlan
    });
  }
}