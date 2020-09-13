import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaleMaisPlan } from "./Models/DialPriceCalculator";
import DialCodeCalculator from "./Models/DialPriceCalculator";
import DialCodePriceRateTable from "./Models/DialCodePriceRateTable";
import { Main, PriceCalculator, PriceCalculatorTitle, FieldContainer, InputLabel, NumberInput, FaleMaisSelect, FaleMaisOption, CalculateButton, DisplayContainer, DisplayLabel, PriceDisplay } from "./AppSubComponents";
import Theme from "./Theming/Theme";
import DialCodePriceTableController from "./Controllers/DialCodePriceTableController";

function App() : JSX.Element
{
  const [rateTable, setRateTable] = useState<DialCodePriceRateTable>(new DialCodePriceRateTable(new Map<number, Map<number, Dinero.Dinero | null>>()));
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
    (async () =>
    {
      try
      {
        const tableData = await DialCodePriceTableController.getPriceRateTableData();
        setRateTable(DialCodePriceRateTable.deserialize(tableData));
      }
      catch(error)
      {
        console.error(error);
      }
    })();
  }, []);

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
          <FieldContainer  style={{border: "1px dashed", borderColor: Theme.color.secondary.darker}}>
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