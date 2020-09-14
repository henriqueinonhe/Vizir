import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaleMaisPlan } from "./Models/DialPriceCalculator";
import DialCodeCalculator from "./Models/DialPriceCalculator";
import DialCodePriceRateTable from "./Models/DialCodePriceRateTable";
import { Main, PriceCalculator, PriceCalculatorTitle, FieldContainer, InputLabel, NumberInput, FaleMaisSelect, FaleMaisOption, CalculateButton, DisplayContainer, DisplayLabel, PriceDisplay, H1 } from "./AppSubComponents";
import Theme from "./Theming/Theme";
import DialCodePriceTableController from "./Controllers/DialCodePriceTableController";
import UsageDataReportController from "./Controllers/UsageDataReportController";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() : JSX.Element
{
  const [rateTable, setRateTable] = useState<DialCodePriceRateTable>(new DialCodePriceRateTable(new Map<number, Map<number, Dinero.Dinero | null>>()));
  const [fromDialCode, setFromDialCode] = useState<number>(11);
  const [toDialCode, setToDialCode] = useState<number>(16);
  const [dialLengthInMinutes, setDialLengthInMinutes] = useState<number>(0);
  const [faleMaisPlan, setFaleMaisPlan] = useState<FaleMaisPlan>(FaleMaisPlan.FaleMais30);
  const [defaultPrice, setDefaultPrice] = useState<Dinero.Dinero | null>(null);
  const [faleMaisPrice, setFaleMaisPrice] = useState<Dinero.Dinero | null>(null);
  const [isWaitingForPriceData, setIsWaitingForPriceData] = useState<boolean>(true);

  async function handleCalculate() : Promise<void>
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

    await UsageDataReportController.sendUsageData(fromDialCode.toString(), 
                                                  toDialCode.toString(), 
                                                  dialLengthInMinutes.toString(), 
                                                  faleMaisPlan);
  }

  useEffect(() => 
  {
    (async () =>
    {
      try
      {
        const tableData = await DialCodePriceTableController.getPriceRateTableData();
        setRateTable(DialCodePriceRateTable.deserialize(tableData));
        setIsWaitingForPriceData(false);
      }
      catch(error)
      {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Main>
      <H1>Telzir</H1>

      <PriceCalculator id="PriceCalculator">
        <PriceCalculatorTitle id="PriceCalculatorTitle">Compare os Preços!</PriceCalculatorTitle>
        {isWaitingForPriceData ? 
          <CircularProgress style={{color: Theme.color.primary.lighter, marginTop: "30px"}}/> :
          <>
            <FieldContainer id="FromDialCodeInputContainer">
              <InputLabel htmlFor="fromDialCodeInput">DDD de Origem</InputLabel>
              <NumberInput 
                value={fromDialCode.toString()}
                onChange={(event) => {setFromDialCode(parseInt(event.target.value));}}
                id="fromDialCodeInput"
              />
            </FieldContainer>
        
            <FieldContainer id="ToDialCodeInputContainer">
              <InputLabel htmlFor="toDialCodeInput">DDD de Destino</InputLabel>
              <NumberInput 
                value={toDialCode.toString()}
                onChange={(event) => {setToDialCode(parseInt(event.target.value));}}
                id="toDialCodeInput"
              />
            </FieldContainer>

            <FieldContainer id="DialLengthInputContainer">
              <InputLabel htmlFor="dialLengthInMinutesInput">Duração da Ligação (Minutos)</InputLabel>
              <NumberInput 
                value={dialLengthInMinutes.toString()}
                onChange={(event) => {setDialLengthInMinutes(parseInt(event.target.value));}}
                id="dialLengthInMinutesInput"
              />
            </FieldContainer>

            <FieldContainer id="FaleMaisPlanInputContainer">
              <InputLabel htmlFor="faleMaisPlanInput">Plano (FaleMais)</InputLabel>
              <FaleMaisSelect value={faleMaisPlan} onChange={(event) => {setFaleMaisPlan(event.target.value as FaleMaisPlan);}} id="faleMaisPlanInput">
                <FaleMaisOption value="FaleMais30">FaleMais30</FaleMaisOption>
                <FaleMaisOption value="FaleMais60">FaleMais60</FaleMaisOption>
                <FaleMaisOption value="FaleMais120">FaleMais120</FaleMaisOption>
              </FaleMaisSelect>
            </FieldContainer>

            <CalculateButton id="CalculateButton" onClick={handleCalculate}>Calcular</CalculateButton>

            <DisplayContainer id="DisplayContainer">
              <FieldContainer id="ComFaleMaisDisplayContainer" style={{border: "1px dashed", borderColor: Theme.color.secondary.darker}}>
                <DisplayLabel>Com FaleMais</DisplayLabel>
                <PriceDisplay id="ComFaleMaisDisplay" isUnavailable={!faleMaisPrice}>{faleMaisPrice?.setLocale("pt-BR").toFormat() ?? "Indisponível"}</PriceDisplay>
              </FieldContainer>

              <FieldContainer id="SemFaleMaisDisplayContainer">
                <DisplayLabel>Sem FaleMais</DisplayLabel>
                <PriceDisplay id="SemFaleMaisDisplay" isUnavailable={!defaultPrice}>{defaultPrice?.setLocale("pt-BR").toFormat() ?? "Indisponível"}</PriceDisplay>
              </FieldContainer>
            </DisplayContainer>
          </>
        }

      </PriceCalculator>
    </Main>
  );
}

const rootNodeId = "root";
const rootNode = document.getElementById(rootNodeId);
ReactDOM.render(<App />, rootNode);