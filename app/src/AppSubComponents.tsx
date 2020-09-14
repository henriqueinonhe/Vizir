import styled from "styled-components";
import Theme from "./Theming/Theme";
import Button from "@material-ui/core/Button";

const breakpoints = Theme.breakpoints;
const primaryColor = Theme.color.primary;
const secondaryColor = Theme.color.secondary;
const inputHeight = "28px";
const inputBorderRadius = "3px";
const inputBackgroundColor = primaryColor.main;
const inputColor = Theme.color.font.darkContrast;
const dangerColor = Theme.color.danger.darkContrast;

export const Main = styled.main`
  padding: 0 20px;
  width: 100%;
  display: flex;
  font-family: "Roboto", Arial, sans-serif;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: #111;
  background-color: #4355b4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%236373c8' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%238f9bde'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");

  /* SVG Background by: SVGBackgrounds.com */
`;

export const H1 = styled.h1`
  text-align: center;
`;

export const PriceCalculator = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;
  border-radius: 8px;
  box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.52);
  background-color: ${primaryColor.dark};
  color: ${Theme.color.font.darkContrast};
  width: 100%;
  max-width: 650px;

  @media ${breakpoints.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 235px;
  margin: 10px 0;
  align-items: center;
  padding: 10px;
`;

export const InputLabel = styled.label`
  text-align: center;
  margin-bottom: 5px;
`;

export const NumberInput = styled.input.attrs(() => ({
  type: "number",
  min: 0
}))`
  text-align: center;
  border: none;
  height: ${inputHeight};
  border-radius: ${inputBorderRadius};
  background-color: ${inputBackgroundColor};
  color: ${inputColor};

  &:focus {
    outline: 1px solid ${primaryColor.lighter};
  }
`;

export const DisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${primaryColor.lighter};
  width: 100%;

  @media ${breakpoints.sm} {
    justify-content: space-evenly;
  }
`;

export const DisplayLabel = styled.span`
  text-align: center;
  margin-bottom: 10px;
  color: ${secondaryColor.light};
`;

interface PriceDisplayProps
{
  isUnavailable : boolean;
}

export const PriceDisplay = styled.span<PriceDisplayProps>`
  text-align: center;
  width: 100px;
  color: ${props => props.isUnavailable ? dangerColor : secondaryColor.lighter};
`;

export const CalculateButton = styled(Button)`
  && {
    width: 100%;
    margin: 10px 0;
    background-color: ${primaryColor.darker};
    color: ${inputColor};
    height: ${inputHeight};
    border: 1px solid white;
    max-width: 418px;
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    
    &:focus {
      outline: none;
    }

    &:hover {
      background-color: ${primaryColor.darker};
    }

  }

`;

export const FaleMaisSelect = styled.select`
  text-align: center;
  text-align-last: center;
  border: none;
  height: ${inputHeight};
  border-radius: ${inputBorderRadius};
  background-color: ${inputBackgroundColor};
  color: ${inputColor};
  width: 182px;

  &:focus {
    outline: 1px solid ${primaryColor.lighter};
  }
`;

export const FaleMaisOption = styled.option`
  text-align: center;
`;

export const PriceCalculatorTitle = styled.h2`
  font-weight: 400;
  display: block;
  width: 100%;
  text-align: center;
`;