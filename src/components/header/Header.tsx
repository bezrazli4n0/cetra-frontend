import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ClosePosition from "../../pages/add-collateral/add-collateral-pages/close-position/ClosePosition";
import AddCollateralMainPage from "../../pages/add-collateral/add-collateral-pages/main-page/AddCollateralMainPage";
import AddCollateral from "../../pages/add-collateral/AddCollateral";
import Farm from "../../pages/farm/Farm";
import Pools from "../../pages/pools/Pools";
import Portfolio from "../../pages/portfolio/Portfolio";
import Navigation from "../navigation/Navigation";
import HeaderBreadcrumbs from "./header-breadcrumbs/HeaderBreadcrumbs";
import HeaderProfile from "./header-profile/HeaderProfile";
import Success from "../success/Success";
import "./header.scss";

function Header() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(document.documentElement.scrollHeight);
    });

    // console.log(height);

    return (
        <>
            <header>
                <div className="main-navigation" id="main-navigation">
                    <Navigation />
                </div>
                <div className="header-nav">
                    <div className="header-nav-links">
                        <HeaderBreadcrumbs />
                        <HeaderProfile />
                    </div>
                    <div className="page">
                        <Routes>
                            <Route path="/" element={<Pools />} />
                            <Route path="/:id" element={<Farm />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/success" element={<Success />} />
                            <Route
                                path="/add-collateral"
                                element={<AddCollateral />}
                            >
                                <Route
                                    path=""
                                    element={<AddCollateralMainPage />}
                                ></Route>
                                <Route
                                    path="close-position"
                                    element={<ClosePosition />}
                                ></Route>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
