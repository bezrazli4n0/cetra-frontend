import React from "react";
import Form from "../../../../components/form/Form";
import Tabs from "../../../../components/tabs/Tabs";

function AddCollateralMainPage() {
    const collateral = true;
    return (
        <>
            <div className="collateral-form">
                <Form props={collateral} />
            </div>
            <Tabs />
        </>
    );
}

export default AddCollateralMainPage;
