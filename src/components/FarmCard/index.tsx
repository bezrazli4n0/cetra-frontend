import { FC, useState } from "react";
import Container, { ContainerType } from "../Container";
import Button, { ButtonType } from "../Button";
import LightTheme from "../../themes/lightTheme";
import Text from "../Text";
import TokenInput from "../TokenInput";
import { BN } from "@project-serum/anchor";
import Icon from "../Icon";

const BP_MAX = new BN(10000);

export interface FarmCardProps {
  baseTokenSymbol: string;
  baseTokenIcon: string;
  quoteTokenSymbol: string;
  quoteTokenIcon: string;
  baseTokenDecimals: number;
  quoteTokenDecimals: number;
  farmName: string;
  farmIcon: string;
  ammName: string;
  ammIcon: string;
  baseTokenAmount: BN;
  quoteTokenAmount: BN;
  apy: number;
  tvl: number;
  onFarm?: (baseTokenAmount: BN, quoteTokenAmount: BN) => void;
}

enum TokenType {
  Base,
  Quote,
}

const FarmCard: FC<FarmCardProps> = (props) => {
  const [baseTokenInputAmount, setBaseTokenInputAmount] = useState(0.0);
  const [quoteTokenInputAmount, setQuoteTokenInputAmount] = useState(0.0);

  const normalizeTokenAmount = (amount: BN, decimals: number): number => {
    return amount.toNumber() / Math.pow(10, decimals);
  };

  const denormalizeTokenAmount = (amount: number, decimals: number): BN => {
    return new BN(amount * Math.pow(10, decimals));
  };

  const handleTokenAmountChange = (tokenType: TokenType, perc: number) => {
    const percScaled = new BN(BP_MAX.toNumber() * perc);

    if (tokenType === TokenType.Base) {
      const result = props.baseTokenAmount.mul(percScaled).div(BP_MAX);
      setBaseTokenInputAmount(
        normalizeTokenAmount(result, props.baseTokenDecimals)
      );
    } else if (tokenType === TokenType.Quote) {
      const result = props.quoteTokenAmount.mul(percScaled).div(BP_MAX);
      setQuoteTokenInputAmount(
        normalizeTokenAmount(result, props.quoteTokenDecimals)
      );
    }
  };

  return (
    <Container
      padding="30px 20px"
      gap="20px"
      borderRadius="5px"
      boxShadow="0px 0px 38px 5px rgba(0, 0, 0, 0.05);"
    >
      <Container
        containerType={ContainerType.Column}
        gridTemplate="1fr 1fr"
        gap="40px"
      >
        <Container
          containerType={ContainerType.Column}
          gridTemplate="auto 1fr"
          alignItems="center"
          gap="10px"
        >
          <Text
            text={`Farm ${props.baseTokenSymbol} - ${props.quoteTokenSymbol}`}
            fontSize="20px"
            fontWeight="700"
            color={LightTheme.textColor}
          />
          <Container
            containerType={ContainerType.Column}
            justifyContent="start"
            alignContent="center"
            gap="4px"
          >
            <Icon src={props.ammIcon} width="14px" height="14px" />
            <Text
              text={props.ammName}
              fontSize="14px"
              fontWeight="500"
              color={LightTheme.textColor}
            />
            <Text
              text="/"
              fontSize="14px"
              fontWeight="500"
              color={LightTheme.borderColor}
            />
            <Icon src={props.farmIcon} width="14px" height="14px" />
            <Text
              text={props.farmName}
              fontSize="14px"
              fontWeight="500"
              color={LightTheme.textColor}
            />
          </Container>
        </Container>
        <Container
          containerType={ContainerType.Column}
          justifyContent="end"
          alignItems="center"
          gap="20px"
        >
          <Text
            text={`APY: ${props.apy * 100.0}%`}
            color={LightTheme.accentColor}
            fontSize="20px"
            fontWeight="700"
          />
          <Text
            text={`TVL: $${Intl.NumberFormat("en", {
              notation: "compact",
            }).format(props.tvl)}`}
            color={LightTheme.textColor}
            fontSize="20px"
            fontWeight="700"
          />
          <Button buttonType={ButtonType.Neutral} height="30px" width="165px">
            <Text
              text="Delta-Neutral"
              fontSize="20px"
              fontWeight="600"
              color={LightTheme.textColor}
            />
          </Button>
        </Container>
      </Container>
      <Container
        containerType={ContainerType.Column}
        gridTemplate="1fr 1fr"
        gap="40px"
      >
        <Container gap="5px">
          <Text
            text={`Available balance: ${normalizeTokenAmount(
              props.baseTokenAmount,
              props.baseTokenDecimals
            )}`}
            fontSize="14px"
            fontWeight="400"
            color={LightTheme.textColor}
          />
          <TokenInput
            src={props.baseTokenIcon}
            text={props.baseTokenSymbol}
            value={baseTokenInputAmount}
            onInput={(value) => setBaseTokenInputAmount(value)}
          />
          <Container
            containerType={ContainerType.Column}
            gridTemplate="min-content min-content min-content auto"
            padding="6px 0px"
            gap="10px"
          >
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Base, 0.25)}
            >
              <Text
                text="25%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Base, 0.5)}
            >
              <Text
                text="50%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Base, 0.75)}
            >
              <Text
                text="75%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Base, 1.0)}
            >
              <Text
                text="100%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
          </Container>
        </Container>
        <Container gap="5px">
          <Text
            text={`Available balance: ${normalizeTokenAmount(
              props.quoteTokenAmount,
              props.quoteTokenDecimals
            )}`}
            fontSize="14px"
            fontWeight="200"
            color={LightTheme.textColor}
          />
          <TokenInput
            src={props.quoteTokenIcon}
            text={props.quoteTokenSymbol}
            value={quoteTokenInputAmount}
            onInput={(value) => setQuoteTokenInputAmount(value)}
          />
          <Container
            containerType={ContainerType.Column}
            gridTemplate="min-content min-content min-content auto"
            padding="6px 0px"
            gap="10px"
          >
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Quote, 0.25)}
            >
              <Text
                text="25%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Quote, 0.5)}
            >
              <Text
                text="50%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Quote, 0.75)}
            >
              <Text
                text="75%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
            <Button
              buttonType={ButtonType.Neutral}
              width="54px"
              height="30px"
              onClick={() => handleTokenAmountChange(TokenType.Quote, 1.0)}
            >
              <Text
                text="100%"
                color={LightTheme.textColor}
                fontSize="16px"
                fontWeight="500"
              />
            </Button>
          </Container>
        </Container>
      </Container>
      <Container containerType={ContainerType.Column} gridTemplate="1fr">
        <Button
          height="40px"
          onClick={() => {
            if (props.onFarm) {
              props.onFarm(
                denormalizeTokenAmount(
                  baseTokenInputAmount,
                  props.baseTokenDecimals
                ),
                denormalizeTokenAmount(
                  quoteTokenInputAmount,
                  props.quoteTokenDecimals
                )
              );
            }
          }}
        >
          <Text
            text="Farm"
            color={LightTheme.bgColor}
            fontSize="24px"
            fontWeight="700"
          />
        </Button>
      </Container>
    </Container>
  );
};

export default FarmCard;
