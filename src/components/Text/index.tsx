import { FC } from "react";
import styled from "styled-components";

export interface TextProps {
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  fontSize?: string;
  text: string;
}

const TextStyled = styled.p<{ props: TextProps }>`
  font-family: ${({ props }) => props.fontFamily ?? "unset"};
  font-weight: ${({ props }) => props.fontWeight ?? "unset"};
  color: ${({ props }) => props.color ?? "unset"};
  font-size: ${({ props }) => props.fontSize ?? "unset"};
`;

const Text: FC<TextProps> = (props) => (
  <TextStyled props={props}>{props.text}</TextStyled>
);

export default Text;
