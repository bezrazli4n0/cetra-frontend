import { FC } from "react";
import styled from "styled-components";
import LightTheme from "../../themes/lightTheme";
import Container, { ContainerType } from "../Container";
import Icon from "../Icon";
import Text from "../Text";

export interface TokenInputProps {
  text: string;
  src?: string;
  value?: number;
  onInput?: (data: number) => void;
}

const TokenInputStyled = styled.input`
  appearance: none;
  margin: 0;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  color: ${LightTheme.textColor};

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TokenInput: FC<TokenInputProps> = (props) => (
  <Container
    containerType={ContainerType.Column}
    gridTemplate={
      props.src ? "max-content auto min-content" : "auto min-content"
    }
    border={`1px solid ${LightTheme.borderColor}`}
    alignItems="center"
    borderRadius="7px"
    gap="8px"
    padding="8px"
  >
    {props.src ? <Icon src={props.src} width="30px" height="30px" /> : null}
    <TokenInputStyled
      placeholder="0.00"
      type="number"
      value={props.value}
      onInput={(e) => {
        const inputValue: number = parseFloat((e.target as any).value);
        if (props.onInput && inputValue) {
          props.onInput(inputValue);
        }
      }}
    />
    <Text
      text={props.text}
      fontSize="20px"
      fontWeight="500"
      color={LightTheme.textColor}
    />
  </Container>
);

export default TokenInput;
