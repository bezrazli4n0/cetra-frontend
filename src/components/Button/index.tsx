import { FC, ReactNode } from "react";
import styled from "styled-components";
import LightTheme from "../../themes/lightTheme";

export enum ButtonType {
  Accent,
  Neutral,
}

export interface ButtonProps {
  buttonType?: ButtonType;
  width?: string;
  height?: string;
  children: ReactNode;
  onClick?: () => void;
}

const ButtonStyled = styled.button<{ props: ButtonProps }>`
  border-radius: 7px;
  border: ${({ props }) =>
    (props.buttonType ?? ButtonType.Accent) === ButtonType.Accent
      ? "unset"
      : `1px solid ${LightTheme.borderColor}`};
  background-color: ${({ props }) =>
    (props.buttonType ?? ButtonType.Accent) === ButtonType.Accent
      ? LightTheme.accentColor
      : LightTheme.bgColor};
  width: ${({ props }) => props.width ?? "100%"};
  height: ${({ props }) => props.height ?? "100%"};
  &:hover {
    cursor: pointer;
  }
`;

const Button: FC<ButtonProps> = (props) => (
  <ButtonStyled
    onClick={() => (props.onClick ? props.onClick() : null)}
    props={props}
  >
    {props.children}
  </ButtonStyled>
);

export default Button;
