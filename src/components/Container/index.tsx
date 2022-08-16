import { FC, ReactNode } from "react";
import styled from "styled-components";

export interface ContainerProps {
  width?: string;
  height?: string;
  justifySelf?: string;
  alignSelf?: string;
  justifyContent?: string;
  alignContent?: string;
  justifyItems?: string;
  alignItems?: string;
  gridTemplate?: string;
  containerType?: ContainerType;
  children?: ReactNode;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  gap?: string;
  boxShadow?: string;
  opacity?: string;
  position?: string;
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
}

export enum ContainerType {
  Row = "row",
  Column = "column",
}

const ContainerStyled = styled.div<{ props: ContainerProps }>`
  display: grid;
  grid-auto-flow: ${({ props }) => props.containerType ?? ContainerType.Row};
  justify-self: ${({ props }) => props.justifySelf ?? "unset"};
  align-self: ${({ props }) => props.alignSelf ?? "unset"};
  width: ${({ props }) => props.width ?? "100%"};
  height: ${({ props }) => props.height ?? "100%"};
  justify-content: ${({ props }) => props.justifyContent ?? "unset"};
  align-content: ${({ props }) => props.alignContent ?? "unset"};
  grid-template-${({ props }) =>
    (props.containerType ?? ContainerType.Row) + "s"}: ${({ props }) =>
  props.gridTemplate ?? "unset"};
  border: ${({ props }) => props.border ?? "unset"};
  border-radius: ${({ props }) => props.borderRadius ?? "unset"};
  background-color: ${({ props }) => props.backgroundColor ?? "unset"};
  margin: ${({ props }) => props.margin ?? "unset"};
  padding: ${({ props }) => props.padding ?? "unset"};
  gap: ${({ props }) => props.gap ?? "unset"};
  justify-items: ${({ props }) => props.justifyItems ?? "unset"};
  align-items: ${({ props }) => props.alignItems ?? "unset"};
  box-shadow: ${({ props }) => props.boxShadow ?? "unset"};
  opacity: ${({ props }) => props.opacity ?? "unset"};
  position: ${({ props }) => props.position ?? "unset"};
  left: ${({ props }) => props.left ?? "unset"};
  top: ${({ props }) => props.top ?? "unset"};
  right: ${({ props }) => props.right ?? "unset"};
  bottom: ${({ props }) => props.bottom ?? "unset"};
`;

const Container: FC<ContainerProps> = (props) => (
  <ContainerStyled props={props}>{props.children}</ContainerStyled>
);

export default Container;
