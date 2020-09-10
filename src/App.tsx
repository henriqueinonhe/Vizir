import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaleMaisPlan } from "./Models/DialPriceCalculator";
import { DineroReal } from "./Utils/Utils";
import DialCodeCalculator from "./Models/DialPriceCalculator";
import DialCodePriceRateTable from "./Models/DialCodePriceRateTable";
import { Main, PriceCalculator, PriceCalculatorTitle, FieldContainer, InputLabel, NumberInput, FaleMaisSelect, FaleMaisOption, CalculateButton, DisplayContainer, DisplayLabel, PriceDisplay } from "./AppSubComponents";

//Temp Table
const rateTableData = new Map<number, Map<number, Dinero.Dinero | null>>();

rateTableData.set(11, new Map<number, Dinero.Dinero | null>());
rateTableData.get(11)!.set(11, null);
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
  const [toDialCode, setToDialCode] = useState<number>(16);
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

  useEffect(() =>
  {
    handleCalculate();
  }, [fromDialCode, toDialCode, dialLengthInMinutes, faleMaisPlan]);

  return (
    <Main>
      <h1>Telzir</h1>

      <PriceCalculator>
        <PriceCalculatorTitle>Compare os Preços!</PriceCalculatorTitle>

        <FieldContainer>
          <InputLabel htmlFor="fromDialCodeInput">DDD de Origem</InputLabel>
          <NumberInput 
            value={fromDialCode.toString()}
            onChange={(event) => {setFromDialCode(parseInt(event.target.value));}}
            id="fromDialCodeInput"
          />
        </FieldContainer>
        
        <FieldContainer>
          <InputLabel htmlFor="toDialCodeInput">DDD de Destino</InputLabel>
          <NumberInput 
            value={toDialCode.toString()}
            onChange={(event) => {setToDialCode(parseInt(event.target.value));}}
            id="toDialCodeInput"
          />
        </FieldContainer>

        <FieldContainer>
          <InputLabel htmlFor="dialLengthInMinutesInput">Duração da Ligação (Minutos)</InputLabel>
          <NumberInput 
            value={dialLengthInMinutes.toString()}
            onChange={(event) => {setDialLengthInMinutes(parseInt(event.target.value));}}
            id="dialLengthInMinutesInput"
          />
        </FieldContainer>

        <FieldContainer>
          <InputLabel htmlFor="faleMaisPlanInput">Plano (FaleMais)</InputLabel>
          <FaleMaisSelect value={faleMaisPlan} onChange={(event) => {setFaleMaisPlan(event.target.value as FaleMaisPlan);}} id="faleMaisPlanInput">
            <FaleMaisOption value="FaleMais30">FaleMais30</FaleMaisOption>
            <FaleMaisOption value="FaleMais60">FaleMais60</FaleMaisOption>
            <FaleMaisOption value="FaleMais120">FaleMais120</FaleMaisOption>
          </FaleMaisSelect>
        </FieldContainer>

        <CalculateButton onClick={handleCalculate}>Calcular</CalculateButton>

        <DisplayContainer>
          <FieldContainer>
            <DisplayLabel>Com FaleMais</DisplayLabel>
            <PriceDisplay>{faleMaisPrice?.setLocale("pt-BR").toFormat() ?? "Não Disponível"}</PriceDisplay>
          </FieldContainer>

          <FieldContainer>
            <DisplayLabel>Sem FaleMais</DisplayLabel>
            <PriceDisplay>{defaultPrice?.setLocale("pt-BR").toFormat() ?? "Não Disponível"}</PriceDisplay>
          </FieldContainer>
        </DisplayContainer>

      </PriceCalculator>
    </Main>
  );
}

const rootNodeId = "root";
const rootNode = document.getElementById(rootNodeId);
ReactDOM.render(<App />, rootNode);