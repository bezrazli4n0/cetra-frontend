import React from "react";
import "./breadcrumbs.scss";
import { Link, NavLink, useLocation } from "react-router-dom";

function HeaderBreadcrumbs(props: any) {
    const location = useLocation();
    let pathArr = location.pathname.split("/");
    pathArr = pathArr.filter((path) => path.length !== 0);
    if (pathArr.length > 1) {
        pathArr = pathArr.slice(0, 1);
    }

    return (
        <div className="header-breadcrumbs">
            <NavLink to={"/"} className="breadcrumbs-item">
                Chamber’s farm
            </NavLink>
            {pathArr.map((path: string) => {
                path = path.charAt(0).toUpperCase() + path.slice(1);
                return (
                    <div key={path}>
                        <span>/</span>
                        <NavLink
                            to={`/${path}`}
                            className="breadcrumbs-item"
                            key={path}
                        >
                            {path}
                        </NavLink>
                    </div>
                );
            })}
        </div>
    );
}

export default HeaderBreadcrumbs;
