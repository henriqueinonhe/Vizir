import Dinero from "dinero.js";

type DialCodePriceRateTableData = Map<number, Map<number, Dinero.Dinero | null>>;

/**
 * Represents a table that stores the price rates
 * of phone calls from a given dial code to another.
 * 
 * Class Invariants:
 * - This class is immutable, so once created it 
 * remains with the same state throughout its entire life.
 * - If a given dial code is valid (that is, there is an entry associated with
 * it in the table), then it has a well defined rate for phone calls
 * performed from this dial code to every other valid code, that is, 
 * the table behaves like a matrix where valid dial codes are the rows/columns.
 * Simply put, for every dial code present as a row, it must also be present as a column.
 * - Conversely, if a there is a rate defined for a given dial code pair, then 
 * the "arrival" dial code must be a valid code and present as a row in the table.
 * Simply put, for every dial code present as a column, it must also be present as a row.
 */
export default class DialCodePriceRateTable
{
  /**
   * Computes valid dial codes, that is, any dial
   * code that is either present as a row or as a column.
   * 
   * Pre Conditions:
   * None
   * 
   * @param tableData 
   */
  private static computeValidDialCodes(tableData : DialCodePriceRateTableData) : Set<number>
  {
    const validDialCodes = new Set(tableData.keys()); //Valid dial codes extracted from table rows
    for(const row of tableData.values())
    {
      for(const columnDialCode of row.keys())
      {
        validDialCodes.add(columnDialCode);
      }
    }
    
    return validDialCodes;
  }

  /**
   * Checks whether [[DialCodePriceTableData]] is valid, that is,
   * every dial code that is present as a row is also present as columns
   * in each row and every dial code that is present as a column is also present
   * as a row.
   * 
   * In the case validation fails, this function throws an exception detailing
   * which dial codes are missing either as rows or as columns.
   * 
   * Pre Conditions:
   * None
   * 
   * @param tableData 
   */
  private static validateDialCodePriceRateTableData(tableData : DialCodePriceRateTableData) : void
  {
    const validDialCodes = DialCodePriceRateTable.computeValidDialCodes(tableData);
    
    const missingDialCodesAsRows = [];
    const dialCodesAsRows = new Set(tableData.keys());
    for(const validDialCode of validDialCodes)
    {
      if(!dialCodesAsRows.has(validDialCode))
      {
        missingDialCodesAsRows.push(validDialCode);
      }
    }

    if(missingDialCodesAsRows.length !== 0)
    {
      throw new Error(`Dial codes "${missingDialCodesAsRows.join(`", "`)}" are valid, but are missing as rows!`);
    }

    const missingDialCodesAsColumns : Array<{fromDialCode : number; missingDialCodes : Array<number>}> = [];
    for(const fromDialCode of tableData.keys())
    {
      const dialCodeRow = tableData.get(fromDialCode)!;
      const missingDialCodesEntry = {fromDialCode: fromDialCode, missingDialCodes: [] as Array<number>};
      for(const validDialCode of validDialCodes)
      {
        if(!dialCodeRow.has(validDialCode))
        {
          missingDialCodesEntry.missingDialCodes.push(validDialCode);
        }
      }

      if(missingDialCodesEntry.missingDialCodes.length !== 0)
      {
        missingDialCodesAsColumns.push(missingDialCodesEntry);
      }
    }

    if(missingDialCodesAsColumns.length !== 0)
    {
      let missingDialCodesErrorMessage = "";
      for(const missingDialCodeEntry of missingDialCodesAsColumns)
      {
        const {fromDialCode, missingDialCodes} = missingDialCodeEntry;
        missingDialCodesErrorMessage += `\nDial codes "${missingDialCodes.join(`", "`)}" are missing from dial code row "${fromDialCode}"`;
      }

      throw new Error(`There are valid dial codes that are missing as columns!` + 
                      `${missingDialCodesErrorMessage}`);
    }
  }
  
  /**
   * Constructs a [[DialCodePriceRateTable]] instance.
   * 
   * Pre Conditions:
   * - `tableData` must be valid. See [[DialCodePriceRateTable]] invariants.
   * 
   * @param tableData 
   */
  constructor(tableData : DialCodePriceRateTableData)
  {
    DialCodePriceRateTable.validateDialCodePriceRateTableData(tableData);
    this.data = tableData;
  }

  /**
   * Checks whether a given dial code is valid in this table instance.
   * 
   * Throws exception if validation fails.
   * 
   * Pre Conditions:
   * None
   * 
   * @param dialCode 
   */
  private validateDialCode(dialCode : number) : void
  {
    if(!this.data.has(dialCode))
    {
      throw new Error(`"${dialCode}" is not a valid dial code!`);
    }
  }

  /**
   * Returns price rate associated with the given dial code pair if 
   * it exists and throws exception otherwise.
   * 
   * Price rate is returned by value.
   * 
   * @param fromDialCode 
   * @param toDialCode 
   */
  public getRate(fromDialCode : number, toDialCode : number) : Dinero.Dinero | null
  {
    this.validateDialCode(fromDialCode);
    this.validateDialCode(toDialCode);

    const rate = this.data.get(fromDialCode)!.get(toDialCode)!;
    if(rate === null)
    {
      return null;
    }
    else
    {
      const rateClone = Dinero({amount: rate.getAmount(), currency: rate.getCurrency(), precision: rate.getPrecision()});
      return rateClone;
    }
  }  

  private data : DialCodePriceRateTableData;
}