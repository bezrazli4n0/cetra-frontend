import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    PhantomWalletAdapter,
    SolletWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "./App.scss";

function App() {
    const endpoint = "https://api.metaplex.solana.com/";

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolletWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <BrowserRouter>
                        <div className="App">
                            <Header />
                        </div>
                    </BrowserRouter>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
