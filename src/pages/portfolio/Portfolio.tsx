import React, { useEffect, useState } from "react";
import "./portfolio.scss";
import icon from "./../../assets/eye.png";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token";
import PortfolioRow from "../../components/portfolio-row/PortfolioRow";
import { useConnection } from "@solana/wallet-adapter-react";

function Portfolio() {
    const CHAMBER_PROGRAM_ID = new PublicKey(
        "cmbrLdggVpadQMe54SMWVvSA6ajswMSBtwnLG2xyqZE"
    );
    const CHAMBER_PUBKEY = new PublicKey(
        "1McaH7H7ZE8uqb2xaAKe5VHQiCRt5ogzamJL9FY5k8C"
    );
    const USDC_MINT = new PublicKey(
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );
    const TARGET_WALLET = new PublicKey(
        "FSha5JkxgfTCaNxRnEvvWdRrnWbYWgHfeiPcW97ghJgz"
    );

    const { connection } = useConnection();
    const [baseBalance, setBaseBalance] = useState(0.0);
    const [quoteBalance, setQuoteBalance] = useState(0.0);
    const [usdBalance, setUsdBalance] = useState(0.0);

    useEffect(() => {
        const getBalance = async () => {
            const targetBaseAta = await getAssociatedTokenAddress(
                NATIVE_MINT,
                TARGET_WALLET
            );
            const targetQuoteAta = await getAssociatedTokenAddress(
                USDC_MINT,
                TARGET_WALLET
            );

            try {
                const baseBalance = await connection.getTokenAccountBalance(
                    targetBaseAta
                );
                const quoteBalance = await connection.getTokenAccountBalance(
                    targetQuoteAta
                );

                // SOL
                const a = parseFloat(baseBalance.value.uiAmountString ?? "0");
                // USDC
                const b = parseFloat(quoteBalance.value.uiAmountString ?? "0");

                const usd = 13.78 * a + b;

                setBaseBalance(a);
                setQuoteBalance(b);

                setUsdBalance(parseFloat(usd.toPrecision(6)));
            } catch (_error) {
                console.log(_error);
            }
        };

        const id = setInterval(() => {
            getBalance().catch(console.error);
        }, 2000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="portfolio-page">
            <div className="portfolio-perfomance">
                <div className="perfomance-title">
                    <div className="perfomance-title-text">
                        Portfolio Perfomance
                    </div>
                    <div className="perfomance-title-icon">
                        <img width={22} height={22} src={icon} alt="" />
                    </div>
                </div>
                <div className="perfomance-details">
                    <div className="perfomance-details-items">
                        <div className="details-item">
                            <div className="details-item-title">Deposited</div>
                            <div className="details-item-subtitle">
                                ${usdBalance}
                            </div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">
                                Monthly Yield
                            </div>
                            <div className="details-item-subtitle">$0,0</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">
                                Daily Yield
                            </div>
                            <div className="details-item-subtitle">$0,0</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">Avg. APY</div>
                            <div className="details-item-subtitle">$15%</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">
                                Total Farmed
                            </div>
                            <div className="details-item-subtitle">$0,0</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="portfolio-positions">
                <div className="positions-title">
                    <div className="positions-title-text">My positions</div>
                    <div className="positions-title-icon">1</div>
                </div>

                <table className="pool-table portfolio-table">
                    <thead className="portfolio-table-header">
                        <tr>
                            <th className="table-head pool">Pool</th>
                            <th className="table-head apy">APY</th>
                            <th className="table-head tvl">Total Position</th>
                            <th className="table-head apr">Farmed</th>
                            <th className="table-head strategy">Strategy</th>
                            <th className="table-head controls"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <PortfolioRow value={usdBalance} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Portfolio;
