import React from "react";
import "./portfolio.scss";
import icon from "./../../assets/eye.png";
import PortfolioRow from "../../components/portfolio-row/PortfolioRow";

function Portfolio() {
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
                            <div className="details-item-subtitle">$15,052</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">
                                Monthly Yield
                            </div>
                            <div className="details-item-subtitle">$15,052</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">
                                Daily Yield
                            </div>
                            <div className="details-item-subtitle">$15,052</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">Avg. APY</div>
                            <div className="details-item-subtitle">$15%</div>
                        </div>
                        <div className="details-item">
                            <div className="details-item-title">
                                Total Farmed
                            </div>
                            <div className="details-item-subtitle">$15,052</div>
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
                        <PortfolioRow />
                        <PortfolioRow />
                        <PortfolioRow />
                        <PortfolioRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Portfolio;
