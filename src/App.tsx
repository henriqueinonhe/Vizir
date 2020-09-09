import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaleMaisPlan } from "./Models/DialPriceCalculator";
import { DineroReal } from "./Utils/Utils";
import DialCodeCalculator from "./Models/DialPriceCalculator";
import DialCodePriceRateTable from "./Models/DialCodePriceRateTable";

//Temp Table
const rateTableData = new Map<number, Map<number, Dinero.Dinero | null>>();

rateTableData.set(11, new Map<number, Dinero.Dinero | null>());
rateTableData.get(11)!.set(11, DineroReal(0));
rateTableData.get(11)!.set(16, DineroReal(190e2));
rateTableData.get(11)!.set(17, DineroReal(170e2));
rateTableData.get(11)!.set(18, DineroReal(90e2));

rateTableData.set(16, new Map<number, Dinero.Dinero | null>());
rateTableData.get(16)!.set(11, DineroReal(290e2));
rateTableData.get(16)!.set(16, null);
rateTableData.get(16)!.set(17, null);
rateTableData.get(16)!.set(18, null);

rateTableData.set(17, new Map<number, Dinero.Dinero | null>());
rateTableData.get(17)!.set(11, DineroReal(270e2));
rateTableData.get(17)!.set(16, null);
rateTableData.get(17)!.set(17, null);
rateTableData.get(17)!.set(18, null);

rateTableData.set(18, new Map<number, Dinero.Dinero | null>());
rateTableData.get(18)!.set(11, DineroReal(190e2));
rateTableData.get(18)!.set(16, null);
rateTableData.get(18)!.set(17, null);
rateTableData.get(18)!.set(18, null);

const rateTable = new DialCodePriceRateTable(rateTableData);


function App() : JSX.Element
{
  const [fromDialCode, setFromDialCode] = useState<number>(11);
  const [toDialCode, setToDialCode] = useState<number>(11);
  const [dialLengthInMinutes, setDialLengthInMinutes] = useState<number>(0);
  const [faleMaisPlan, setFaleMaisPlan] = useState<FaleMaisPlan>(FaleMaisPlan.FaleMais30);
  const [defaultPrice, setDefaultPrice] = useState<Dinero.Dinero | null>(null);
  const [faleMaisPrice, setFaleMaisPrice] = useState<Dinero.Dinero | null>(null);

  function handleCalculate() : void
  {
    try
    {
      setDefaultPrice(DialCodeCalculator.defaultPrice(rateTable, fromDialCode, toDialCode, dialLengthInMinutes));
    }
    catch
    {
      setDefaultPrice(null);
    }

    try
    {
      setFaleMaisPrice(DialCodeCalculator.faleMaisPrice(rateTable, fromDialCode, toDialCode, dialLengthInMinutes, faleMaisPlan as FaleMaisPlan));
    }
    catch
    {
      setFaleMaisPrice(null);
    }
  }

  return (
    <>
      <input 
        type="number" 
        value={fromDialCode}
        onChange={(event) => {setFromDialCode(parseInt(event.target.value));}}
      />
      <input 
        type="number" 
        value={toDialCode}
        onChange={(event) => {setToDialCode(parseInt(event.target.value));}}
      />
      <input 
        type="number" 
        value={dialLengthInMinutes}
        onChange={(event) => {setDialLengthInMinutes(parseInt(event.target.value));}}
      />
      <select value={faleMaisPlan} onChange={(event) => {setFaleMaisPlan(event.target.value as FaleMaisPlan);}}>
        <option value="FaleMais30">FaleMais30</option>
        <option value="FaleMais60">FaleMais60</option>
        <option value="FaleMais120">FaleMais120</option>
      </select>

      <input type="text" readOnly value={defaultPrice?.setLocale("pt-BR").toFormat() ?? "Não Disponível"}/>
      <input type="text" readOnly value={faleMaisPrice?.setLocale("pt-BR").toFormat() ?? "Não Disponível"}/>
      <button onClick={handleCalculate}>Calcular</button>
    </>
  );
}

const rootNodeId = "root";
const rootNode = document.getElementById(rootNodeId);
ReactDOM.render(<App />, rootNode);