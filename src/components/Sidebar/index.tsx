import { FC, useState } from "react";
import styled from "styled-components";
import cetraLogo from "../../assets/cetraLogo.svg";
import twitterLogo from "../../assets/twitterLogo.svg";
import discordLogo from "../../assets/discordLogo.svg";
import mediumLogo from "../../assets/mediumLogo.svg";
import LightTheme from "../../themes/lightTheme";
import Icon from "../Icon";

const SidebarStyled = styled.div`
  display: grid;
  max-width: 250px;
  background: ${LightTheme.bgColor};
  grid-template-rows: min-content min-content auto;
  height: 100vh;
`;

const ContentStyled = styled.div<{
  alignContent?: string;
  justifyContent?: string;
  padding?: { top?: number; bottom?: number };
  gridTemplate?: string;
  gridAutoFlow?: string;
}>`
  display: grid;
  padding: ${(props) => props.padding?.top ?? 35}px
    ${(props) => props.padding?.bottom ?? 0}px;
  grid-auto-flow: ${(props) => props.gridAutoFlow ?? "row"};
  grid-template-rows: ${(props) => props.gridTemplate ?? "unset"};
  border: 1px solid #e8ecfd;
  align-content: ${(props) => props.alignContent ?? "center"};
  justify-content: ${(props) => props.justifyContent ?? "unset"};
`;

const ListStyled = styled.ul`
  display: grid;
  width: 70%;
  justify-self: center;
`;

const ListElementStyled = styled.li`
  list-style: none;
  text-align: left;
  padding: 20px 0px;
`;

const LinkStyled = styled.a<{
  selected?: { width?: number };
  fontSize?: number;
}>`
  ${(props) =>
    (props.selected
      ? `
      &::before {
        content: "";
        position: absolute;
        width: ${props.selected.width ?? 5}px;
        height: ${props.fontSize ?? 24}px;
        background-color: ${LightTheme.accentColor};
        left: 0px;
        top: inherit;
      }
    `
      : ``) ?? ``}
  color: ${LightTheme.textColor};
  font-size: ${(props) => props.fontSize ?? 24}px;
  font-weight: ${(props) => (props.selected ? "700" : "500") ?? "500"};
  text-decoration: none;
`;

const FooterContentStyled = styled.div`
  display: grid;
  grid-auto-flow: row;
  align-self: end;
  justify-self: center;
  width: 80%;
  height: 200px;
  background-color: ${LightTheme.accentColor};
  border-radius: 5px 5px 0px 0px;
`;

const FooterSocialStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
`;

const FooterContentWrapperStyled = styled.div`
  display: grid;
  width: 80%;
  grid-template-rows: auto auto auto;
  justify-self: center;
  padding: 15px 0px;
`;

const FooterListWrapperStyled = styled.div`
  justify-self: center;
  align-self: center;

  & > ul {
    list-style-type: none;
  }
  & > ul > li > a {
    font-weight: 600;
    text-decoration: none;
    font-size: 20px;
    color: ${LightTheme.bgColor};
  }
`;

const FooterLabsStyled = styled.div`
  justify-self: center;
  & > p {
    color: ${LightTheme.bgColor};
    font-size: 14px;
    font-weight: 500;
  }
  align-self: end;
`;

export interface SidebarProps {
  mainElements: Array<string>;
  subElements: Array<string>;
  onSelect?: (element: string) => void;
}

enum CategoryType {
  Main,
  Sub,
}

const Sidebar: FC<SidebarProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<[number, CategoryType]>([
    0,
    CategoryType.Main,
  ]);

  return (
    <SidebarStyled>
      <ContentStyled>
        <Icon src={cetraLogo} alt="Cetra Finance Logo" />
      </ContentStyled>
      <ContentStyled>
        <ListStyled>
          {props.mainElements.map((name, index) => {
            const isSelected =
              index === selectedIndex[0] &&
              selectedIndex[1] === CategoryType.Main;

            return (
              <ListElementStyled>
                <LinkStyled
                  onClick={() => {
                    setSelectedIndex([index, CategoryType.Main]);
                    if (props.onSelect) {
                      props.onSelect(name);
                    }
                  }}
                  selected={isSelected ? {} : undefined}
                  href="#"
                >
                  {name}
                </LinkStyled>
              </ListElementStyled>
            );
          })}
        </ListStyled>
      </ContentStyled>
      <ContentStyled
        alignContent="start"
        padding={{ top: 0 }}
        gridTemplate="min-content 1fr"
      >
        <ListStyled>
          {props.subElements.map((name, index) => {
            const isSelected =
              index === selectedIndex[0] &&
              selectedIndex[1] === CategoryType.Sub;

            return (
              <ListElementStyled>
                <LinkStyled
                  onClick={() => {
                    setSelectedIndex([index, CategoryType.Sub]);
                    if (props.onSelect) {
                      props.onSelect(name);
                    }
                  }}
                  selected={isSelected ? {} : undefined}
                  href="#"
                >
                  {name}
                </LinkStyled>
              </ListElementStyled>
            );
          })}
        </ListStyled>
        <FooterContentStyled>
          <FooterContentWrapperStyled>
            <FooterSocialStyled>
              <a href="#">
                <Icon src={twitterLogo} alt="Twitter" />
              </a>
              <a href="#">
                <Icon src={discordLogo} alt="Discord" />
              </a>
              <a href="#">
                <Icon src={mediumLogo} alt="Medium" />
              </a>
            </FooterSocialStyled>
            <FooterListWrapperStyled>
              <ul>
                <li>
                  <a href="#">How it works</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </FooterListWrapperStyled>
            <FooterLabsStyled>
              <p>Cetra Labs, 2022</p>
            </FooterLabsStyled>
          </FooterContentWrapperStyled>
        </FooterContentStyled>
      </ContentStyled>
    </SidebarStyled>
  );
};

export default Sidebar;
