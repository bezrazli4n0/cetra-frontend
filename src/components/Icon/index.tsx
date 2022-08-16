import { FC } from "react";
import Container from "../Container";
import styled from "styled-components";

const IconStyled = styled.img<{
  width?: string;
  height?: string;
}>`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? "100%"};
`;

const Icon: FC<{
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}> = ({ src, width, height, alt }) => (
  <Container justifyContent="center" alignContent="center">
    <IconStyled width={width} height={height} src={src} alt={alt ?? "Icon"} />
  </Container>
);

export default Icon;
