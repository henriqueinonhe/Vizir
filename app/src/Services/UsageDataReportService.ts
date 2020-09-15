import crypto from "crypto";
import DatabaseService from "./DatabaseService";

/**
 * App usage data reporting.
 */
export default class UsageDataReportService
{
  /**
   * Stores usage data in the database.
   * 
   * Client Ip is stored as a hash to
   * ensure anonymization. 
   * 
   * As we don't really need a cryptographic hash 
   * algorithm, SHA1 is being used as it is
   * inexpensive in computational terms.
   * 
   * Pre Conditions:
   * - Must connect successfully to database.
   * 
   * @param clientIp 
   * @param fromDialCode 
   * @param toDialCode 
   * @param dialLength 
   * @param faleMaisPlan 
   */
  public static async storeUsageData(clientIp : string, fromDialCode : string, toDialCode : string, dialLength : string, faleMaisPlan : string) : Promise<void>
  {
    const hashedClientIp = crypto.createHash("sha1").update(clientIp).digest("hex");
    const data = {hashedClientIp, fromDialCode, toDialCode, dialLength, faleMaisPlan};
    const client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
    const database = client.db(DatabaseService.telzirDatabaseName);
    await database.collection(UsageDataReportService.usageDataCollectionName).insertOne(data);
  }

  public static readonly usageDataCollectionName = "usageData";
}

