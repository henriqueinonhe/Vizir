import Dinero from "dinero.js";
import DialCodePriceRateTable from "./DialCodePriceRateTable";

/**
 * Represents existing FaleMais plans.
 * 
 */
export enum FaleMaisPlan
{
  FaleMais30 = "FaleMais30",
  FaleMais60 = "FaleMais60",
  FaleMais120 = "FaleMais120"
}

/**
 * Acts mostly as a table for FaleMais plans minutes limit.
 * 
 * Pre Conditions:
 * - `faleMaisPlan` must have a minutes limit associated with it.
 *  
 * @param faleMaisPlan 
 */
export function faleMaisPlanMinutes(faleMaisPlan : FaleMaisPlan) : number
{
  switch(faleMaisPlan)
  {
  case FaleMaisPlan.FaleMais30:
    return 30;

  case FaleMaisPlan.FaleMais60:
    return 60;

  case FaleMaisPlan.FaleMais120:
    return 120;

  default:
    throw new Error(`The minutes limit for the plan ${faleMaisPlan} is not defined!`);
  }
}

/**
 * Checks whether a given dial length in minutes is valid, that is,
 * is a non-negative integer and throws an exception in the case it is invalid.
 * 
 * @param lengthInMinutes 
 */
function validateDialLengthInMinutes(lengthInMinutes : number) : void
{
  if(lengthInMinutes < 0 || !Number.isInteger(lengthInMinutes))
  {
    throw new Error(`dialLengthInMinutes (${lengthInMinutes}) must be a non-negative integer!`);
  }
}

export default {
  /**
   * Default method for calculating dial prices.
   * 
   * Pre Conditions:
   * - `fromDialCode` must be a valid dial code.
   * - `toDialCode` must be a valid dial code.
   * - `dialLengthInMinutes` must be a non-negative integer.
   * 
   * @param dialCodePriceRateTable 
   * @param fromDialCode 
   * @param toDialCode 
   * @param dialLengthInMinutes 
   */
  defaultPrice(dialCodePriceRateTable : DialCodePriceRateTable, 
               fromDialCode : number, 
               toDialCode : number, 
               dialLengthInMinutes : number) : Dinero.Dinero
  {
    validateDialLengthInMinutes(dialLengthInMinutes);

    const priceRate = dialCodePriceRateTable.getRate(fromDialCode, toDialCode);
    return priceRate.multiply(dialLengthInMinutes, "HALF_DOWN");
  },

  /**
   * Method for calculating dial prices whenever
   * FaleMais plan is applicable.
   * 
   * Pre Conditions:
   * - `fromDialCode` must be a valid dial code.
   * - `toDialCode` must be a valid dial code.
   * - `dialLengthInMinutes` must be a non-negative integer.
   * 
   * @param dialCodePriceRateTable 
   * @param fromDialCode 
   * @param toDialCode 
   * @param dialLengthInMinutes 
   * @param faleMaisMinutesLimit 
   */
  faleMaisPrice(dialCodePriceRateTable : DialCodePriceRateTable, 
                fromDialCode : number, 
                toDialCode : number, 
                dialLengthInMinutes : number, 
                faleMaisPlan : FaleMaisPlan) : Dinero.Dinero
  {
    validateDialLengthInMinutes(dialLengthInMinutes);

    const faleMaisMinutesLimit = faleMaisPlanMinutes(faleMaisPlan);
    const priceRate = dialCodePriceRateTable.getRate(fromDialCode, toDialCode);
    const overLimitPriceRate = priceRate.multiply(1.1);
    const minutesOverPlanLimit = dialLengthInMinutes > faleMaisMinutesLimit ?
      dialLengthInMinutes - faleMaisMinutesLimit : 0;
    
    return overLimitPriceRate.multiply(minutesOverPlanLimit);
  }
};