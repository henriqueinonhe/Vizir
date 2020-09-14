import crypto from "crypto";
import DatabaseService from "./DatabaseService";

export default class UsageDataReportService
{
  public static async storeUsageData(clientIp : string, fromDialCode : string, toDialCode : string, dialLength : string, faleMaisPlan : string) : Promise<void>
  {
    const hashedClientIp = crypto.createHash("sha1").update(clientIp).digest();
    const data = {hashedClientIp, fromDialCode, toDialCode, dialLength, faleMaisPlan};
    const client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
    const database = client.db("telzir");
    await database.collection("usageData").insertOne(data);
  }
}

