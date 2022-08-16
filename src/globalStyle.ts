import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Gilroy";
  src: url("${process.env.PUBLIC_URL + "/fonts/gilroy/gilroy-bold.ttf"}");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Gilroy";
  src: url("${process.env.PUBLIC_URL + "/fonts/gilroy/gilroy-medium.ttf"}");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Gilroy";
  src: url("${process.env.PUBLIC_URL + "/fonts/gilroy/gilroy-semibold.ttf"}");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Gilroy";
  src: url("${process.env.PUBLIC_URL + "/fonts/gilroy/gilroy-regular.ttf"}");
  font-weight: 400;
  font-style: normal;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Gilroy", Arial, sans-serif;
}

body {
  background-image: url("${process.env.PUBLIC_URL + "/bg.png"}");
  background-repeat: no-repeat;
}
`;

export default GlobalStyle;
