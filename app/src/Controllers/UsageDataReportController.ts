import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT}/usageData`
});

/**
 * Controls usage data reports from the client side.
 */
export default class UsageDataReportController
{
  /**
   * Send usage data to server for further processing.
   * 
   * Pre Conditions: 
   * - Server must respond appropriately.
   * 
   * @param fromDialCode 
   * @param toDialCode 
   * @param dialLength 
   * @param faleMaisPlan 
   */
  public static async sendUsageData(fromDialCode : string, toDialCode : string, dialLength : string, faleMaisPlan : string) : Promise<unknown>
  {
    const response =  await api.post("/", {
      fromDialCode,
      toDialCode,
      dialLength,
      faleMaisPlan
    });

    return await response.data;
  }
}