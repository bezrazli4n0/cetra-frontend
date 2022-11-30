import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./headerprofile.scss";
import "@solana/wallet-adapter-react-ui/styles.css";

function loggedOut() {
    return <div className="profile-text logout">Connect Wallet</div>;
}

function loggedIn() {
    return (
        <>
            <div className="profile-name">AVsd...F12K</div>
            <div className="profile-icon">
                <svg
                    width="8"
                    height="7"
                    viewBox="0 0 8 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.13397 6.5C3.51887 7.16667 4.48113 7.16667 4.86603 6.5L7.4641 2C7.849 1.33334 7.36788 0.500002 6.59808 0.500002L1.40193 0.500001C0.632126 0.500001 0.151 1.33333 0.5359 2L3.13397 6.5Z"
                        fill="#1F2040"
                    />
                </svg>
            </div>
        </>
    );
}

function HeaderProfile() {
    // const isLogged = true;
    return (
        <WalletMultiButton />
        // <div className={isLogged ? "header-profile" : "header-profile logout"}>
        //     <WalletMultiButton />
        //     {/* <WalletDisconnectButton /> */}
        //     {/* {isLogged ? loggedIn() : loggedOut()} */}
        // </div>
    );
}

export default HeaderProfile;
