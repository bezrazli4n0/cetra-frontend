import React from "react";
import PoolRow from "../../components/pool-row/PoolRow";
import "./pools.scss";

function Pools() {
    return (
        <div className="pool-page">
            <table className="pool-table">
                <thead className="pool-table-header">
                    <tr>
                        <th className="table-head pool">Pool</th>
                        <th className="table-head apy">APY</th>
                        <th className="table-head tvl">TVL</th>
                        <th className="table-head apr">Yield (APR)</th>
                        <th className="table-head strategy">Strategy</th>
                        <th className="table-head controls"></th>
                    </tr>
                </thead>
                <tbody>
                    <PoolRow />
                </tbody>
            </table>
        </div>
    );
}

export default Pools;
