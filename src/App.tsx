import { FC } from "react";
import FarmCard from "./components/FarmCard";
import GlobalStyle from "./globalStyle";
import { BN } from "@project-serum/anchor";
import tulipLogo from "./assets/tulipLogo.png";
import raydiumLogo from "./assets/raydiumLogo.svg";
import Container from "./components/Container";

const App: FC<{}> = () => (
  <>
    <GlobalStyle />
    <Container
      width="1575px"
      position="absolute"
      left="300px"
      top="120px"
      height="350px"
    >
      <FarmCard
        baseTokenAmount={new BN(1200000000)}
        baseTokenDecimals={9}
        quoteTokenAmount={new BN(100000000)}
        quoteTokenDecimals={6}
        baseTokenSymbol="SOL"
        baseTokenIcon="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
        quoteTokenSymbol="USDC"
        quoteTokenIcon="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
        farmName="Tulip"
        farmIcon={tulipLogo}
        ammName="Raydium"
        ammIcon={raydiumLogo}
        apy={0.4447}
        tvl={972320}
        onFarm={(baseAmount, quoteAmount) =>
          console.log(`farm with: ${baseAmount} - ${quoteAmount}`)
        }
      />
    </Container>
  </>
);

export default App;
