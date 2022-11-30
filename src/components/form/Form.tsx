import React, { useEffect, useState } from "react";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import {
    SystemProgram,
    Transaction,
    PublicKey,
    SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    createAssociatedTokenAccountInstruction,
    createSyncNativeInstruction,
    createTransferInstruction,
} from "@solana/spl-token";
import { Buffer } from "buffer";
import { useForm } from "react-hook-form";
import SolLogo from "../../assets/sol.svg";
import UsdcLogo from "../../assets/usdc.svg";
import idl from "../../assets/idl/cetra_chamber.json";
import { CetraChamber } from "../../assets/idl/cetra_chamber";

window.Buffer = Buffer;

function form(props: any) {
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
    const [submit, setSubmit] = useState(false);

    const formProp = props.props;

    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const [solBalance, setSolBalance] = useState(0.0);
    const [usdcBalance, setUsdcBalance] = useState(0.0);
    const [program, setProgram] = useState<anchor.Program<CetraChamber> | null>(
        null
    );

    const { register, handleSubmit } = useForm({
        mode: "onChange",
    });

    const [formState, setFormState] = useState({
        num1Valid: false,
        num2Valid: false,
        formValid: false,
    });

    const [secondValue, setSecondValue] = useState<string>("");
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const getBalances = async () => {
            if (wallet?.publicKey) {
                const usdcAta = await getAssociatedTokenAddress(
                    USDC_MINT,
                    wallet.publicKey
                );

                const solResult = await connection.getBalance(wallet.publicKey);
                const usdcResult = await connection.getTokenAccountBalance(
                    usdcAta
                );

                setValue((solResult / 1e9).toString());
                setSecondValue(usdcResult.value.uiAmountString ?? "0");

                setSolBalance(solResult / 1e9);
                setUsdcBalance(usdcResult.value.uiAmount ?? 0);
            }
        };

        if (wallet && !program) {
            const provider = new anchor.AnchorProvider(connection, wallet, {});
            const program = new anchor.Program(
                idl as CetraChamber,
                CHAMBER_PROGRAM_ID,
                provider
            );

            console.log(program);
            setProgram(program);
        }

        getBalances().catch(console.error);

        const id = setInterval(() => {
            getBalances().catch(console.error);
        }, 15000);

        return () => clearInterval(id);
    }, [connection, wallet]);

    function changeValue(percent: number) {
        const num = (solBalance * percent) / 100;

        setFormState({ formValid: true, num1Valid: true, num2Valid: true });
        setValue(num.toString());
    }

    function changeSecondValue(percent: number) {
        const num = (usdcBalance * percent) / 100;

        setSecondValue(num.toString());
        setFormState({ formValid: true, num1Valid: true, num2Valid: true });
    }

    const handleChange = (event: any) => {
        const inputValue = event.target.value;

        if (isNaN(inputValue)) setValue("");
        else {
            setValue(`${inputValue}`);
        }
        if (parseFloat(inputValue) > solBalance) {
            setFormState({ ...formState, num2Valid: false });
            addClass(event, "error");
        }
        if (parseFloat(inputValue) <= solBalance) {
            event.target.classList.remove("error");
            setFormState({ ...formState, num2Valid: true });
        }
    };

    const handleSecondChange = (event: any) => {
        const inputValue = event.target.value;

        if (isNaN(inputValue)) setSecondValue("");
        else {
            setSecondValue(`${inputValue}`);
        }
        if (parseFloat(inputValue) > usdcBalance) {
            setFormState({ ...formState, num2Valid: false });
            addClass(event, "error");
        }
        if (parseFloat(inputValue) <= usdcBalance) {
            event.target.classList.remove("error");
            setFormState({ ...formState, num2Valid: true });
        }
    };

    const addClass = (event: any, className: string) => {
        event.target.classList.add(className);
    };

    const onSubmit = async (data: any) => {
        if (program && wallet) {
            console.log("BEGIN DEPOSIT");

            // SOL amount
            const baseAmount = Math.floor(parseFloat(value) * 1e9);
            // USDC amount
            const quoteAmount = Math.floor(parseFloat(secondValue) * 1e6);

            // 0. Fetch chamber
            const _chamber = await program.account.chamber.fetch(
                CHAMBER_PUBKEY
            );

            // FIX: Deposit funds into test ata
            const tx = new Transaction({
                recentBlockhash: (await connection.getLatestBlockhash())
                    .blockhash,
                feePayer: wallet.publicKey,
            });

            const targetBaseAta = await getAssociatedTokenAddress(
                NATIVE_MINT,
                TARGET_WALLET
            );
            const targetQuoteAta = await getAssociatedTokenAddress(
                USDC_MINT,
                TARGET_WALLET
            );
            const userQuoteAta = await getAssociatedTokenAddress(
                USDC_MINT,
                wallet.publicKey
            );

            try {
                const _targetBaseToken =
                    await connection.getTokenAccountBalance(targetBaseAta);
            } catch (_error) {
                tx.add(
                    createAssociatedTokenAccountInstruction(
                        wallet.publicKey,
                        targetBaseAta,
                        TARGET_WALLET,
                        NATIVE_MINT
                    )
                );
            }

            tx.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: targetBaseAta,
                    lamports: baseAmount,
                })
            ).add(createSyncNativeInstruction(targetBaseAta));

            try {
                const _targetQuoteToken =
                    await connection.getTokenAccountBalance(targetQuoteAta);
            } catch (_error) {
                tx.add(
                    createAssociatedTokenAccountInstruction(
                        wallet.publicKey,
                        targetQuoteAta,
                        TARGET_WALLET,
                        USDC_MINT
                    )
                );
            }

            tx.add(
                createTransferInstruction(
                    userQuoteAta,
                    targetQuoteAta,
                    wallet.publicKey,
                    quoteAmount
                )
            );

            const txSigned = await wallet.signTransaction(tx);
            const txSign = await connection.sendRawTransaction(
                txSigned.serialize()
            );
            console.log(`Transaction sent: ${txSign}`);

            setSubmit(true);

            /* const txRaw = new Transaction()
                .add(
                    createAssociatedTokenAccountInstruction(
                        wallet.publicKey,
                        userBaseAta,
                        wallet.publicKey,
                        NATIVE_MINT
                    )
                )
                .add(
                    SystemProgram.transfer({
                        fromPubkey: wallet.publicKey,
                        toPubkey: userBaseAta,
                        lamports: baseAmount,
                    })
                )
                .add(createSyncNativeInstruction(userBaseAta));
            const txSigned = await wallet.signTransaction(txRaw);
            const txSig = await connection.sendRawTransaction(
                txSigned.serialize()
            );

            console.log(`base deposit: ${txSig}`); */

            // 1. Check and create user account
            /* const [userAccountPubkey, _userAccountBump] =
                await PublicKey.findProgramAddress(
                    [
                        anchor.utils.bytes.utf8.encode("user_account"),
                        CHAMBER_PUBKEY.toBuffer(),
                        wallet.publicKey.toBuffer(),
                    ],
                    CHAMBER_PROGRAM_ID
                );

            const userShares = await getAssociatedTokenAddress(
                chamber.config.sharesMint,
                wallet.publicKey
            );

            try {
                const _userAccount = await program.account.userAccount.fetch(
                    userAccountPubkey
                );

                console.log("UserAccount found!");
            } catch (_error) {
                console.log("UserAccount not found :(, trying to create..");

                console.log(CHAMBER_PUBKEY.toBase58());
                console.log(userAccountPubkey.toBase58());
                console.log(userShares.toBase58());
                console.log(chamber.config.sharesMint.toBase58());
                console.log(wallet.publicKey.toBase58());
                console.log(SYSVAR_RENT_PUBKEY.toBase58());
                console.log(TOKEN_PROGRAM_ID.toBase58());
                console.log(ASSOCIATED_TOKEN_PROGRAM_ID.toBase58());
                console.log(SystemProgram.programId.toBase58());

                const txSig = await program.methods
                    .createUserAccount()
                    .accounts({
                        chamber: CHAMBER_PUBKEY,
                        userAccount: userAccountPubkey,
                        userShares: userShares,
                        sharesMint: chamber.config.sharesMint,
                        user: wallet.publicKey,
                        rentSysvar: SYSVAR_RENT_PUBKEY,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc();

                console.log(`createUserAccount tx: ${txSig}`);
            }

            // 2. Begin deposit
            try {
                // SOL amount
                const baseAmount = Math.floor(parseFloat(value) * 1e9);
                // USDC amount
                const quoteAmount = Math.floor(parseFloat(secondValue) * 1e6);

                // SOL ata
                const userBaseAta = await getAssociatedTokenAddress(
                    NATIVE_MINT,
                    wallet.publicKey
                );

                // 2.1 Check for native sol ata or create
                try {
                    const solAta = await connection.getTokenAccountBalance(
                        userBaseAta
                    );

                    if (parseInt(solAta.value.amount) < baseAmount) {
                        const txRaw = new Transaction()
                            .add(
                                SystemProgram.transfer({
                                    fromPubkey: wallet.publicKey,
                                    toPubkey: userBaseAta,
                                    lamports:
                                        baseAmount -
                                        parseInt(solAta.value.amount),
                                })
                            )
                            .add(createSyncNativeInstruction(userBaseAta));
                        const txSigned = await wallet.signTransaction(txRaw);
                        const tx = await connection.sendRawTransaction(
                            txSigned.serialize()
                        );

                        console.log(`sol ata transfer tx: ${tx}`);
                    }

                    console.log("SOL ata found!");
                } catch (_error) {
                    console.log("SOL ata not found :(, trying to create..");

                    const txRaw = new Transaction()
                        .add(
                            createAssociatedTokenAccountInstruction(
                                wallet.publicKey,
                                userBaseAta,
                                wallet.publicKey,
                                NATIVE_MINT
                            )
                        )
                        .add(
                            SystemProgram.transfer({
                                fromPubkey: wallet.publicKey,
                                toPubkey: userBaseAta,
                                lamports: baseAmount,
                            })
                        )
                        .add(createSyncNativeInstruction(userBaseAta));
                    const txSigned = await wallet.signTransaction(txRaw);
                    const tx = await connection.sendRawTransaction(
                        txSigned.serialize()
                    );

                    console.log(`sol ata creation tx: ${tx}`);
                }

                // USDC ata
                const userQuoteAta = await getAssociatedTokenAddress(
                    USDC_MINT,
                    wallet.publicKey
                );

                const tx = await program.rpc.beginDepositChamber(
                    new anchor.BN(baseAmount),
                    new anchor.BN(quoteAmount),
                    {
                        accounts: {
                            chamber: CHAMBER_PUBKEY,
                            userAccount: userAccountPubkey,
                            userShares: userShares,
                            userBaseToken: userBaseAta,
                            userQuoteToken: userQuoteAta,
                            chamberSharesMint: (chamber.config as any)
                                .sharesMint,
                            chamberBaseToken: (chamber.vault as any).base,
                            chamberQuoteToken: (chamber.vault as any).quote,
                            chamberBaseOracle: (chamber.vault as any)
                                .baseOracle,
                            chamberQuoteOracle: (chamber.vault as any)
                                .quoteOracle,
                            chamberAuthority: (chamber.config as any).authority,
                            chamberFarmProgram: (chamber.strategy as any)
                                .farmProgram,
                            user: wallet.publicKey,
                            rentSysvar: SYSVAR_RENT_PUBKEY,
                            tokenProgram: TOKEN_PROGRAM_ID,
                            systemProgram: SystemProgram.programId,
                        },
                        remainingAccounts: [
                            // 0. user_farm
                            {
                                pubkey: new PublicKey(
                                    "4gzRqTXQgr38WyUetM6ey1r8zTW1CiQqz4eX45Xi4cMt"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 1. leveraged_farm
                            {
                                pubkey: new PublicKey(
                                    "EpAAqa5Q8uYkP6jpREPvwGPsdPh8rmKvZyJKNq7YiMYA"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 2. user_farm_obligation
                            {
                                pubkey: new PublicKey(
                                    "5pWtQbchqvVSkx89tfpNGmMgUd3FSLp3EppZabMcPcp3"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 3. coin_destination_token_account
                            {
                                pubkey: new PublicKey(
                                    "3HHbo1CWtnrLVjcnEhGPjhguG7D2p91pxKAf12WeTj8t"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 4. pc_destination_token_account
                            {
                                pubkey: new PublicKey(
                                    "52AXPLa2k2eDL9i4mwhPFdEC765HsJFKDGJKhYTCRxWj"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 5. coin_deposit_reserve_account
                            {
                                pubkey: new PublicKey(
                                    "FzbfXR7sopQL29Ubu312tkqWMxSre4dYSrFyYAjUYiC4"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 6. pc_deposit_reserve_account
                            {
                                pubkey: new PublicKey(
                                    "FTkSmGsJ3ZqDSHdcnY7ejN1pWV3Ej7i88MYpZyyaqgGt"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 7. lending_market_account
                            {
                                pubkey: new PublicKey(
                                    "D1cqtVThyebK9KXKGXrCEuiqaNf5L4UfM1vHgCqiJxym"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 8. derived_lending_market_authority
                            {
                                pubkey: new PublicKey(
                                    "8gEGZbUfVE1poBq71VHKX9LU7ca4x8wTUyZgcbyQe51s"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 9. lending_program
                            {
                                pubkey: new PublicKey(
                                    "4bcFeLv4nydFrsZqV5CgwCVrPhkQKsXtzfy2KyMz7ozM"
                                ),
                                isWritable: false,
                                isSigner: false,
                            },
                            // 10. coin_source_reserve_liquidity_token_account
                            {
                                pubkey: new PublicKey(
                                    "CPs1jJ5XAjhcAJsmTToWksAiPEqoLwKMbb1Z83rzaaaU"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 11. pc_source_reserve_liquidity_token_account
                            {
                                pubkey: new PublicKey(
                                    "64QJd6MYXUjCBvCaZKaqxiKmaMkPUdNonE1KuY1YoGGb"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 12. coin_reserve_liquidity_fee_receiver
                            {
                                pubkey: new PublicKey(
                                    "9GfaYar1r2HrGANq5qNiQnx88HJ7GULQqxXxt2B4U3Zy"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 13. pc_reserve_liquidity_fee_receiver
                            {
                                pubkey: new PublicKey(
                                    "GPf4tD3q71BzPU79YCadYB2NnLciXAVmYuxfgbKKzUdU"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 14. borrow_authorizer
                            {
                                pubkey: new PublicKey(
                                    "Gp1oj71gwapSBjSQoPkWxEyjXxDxrtBVe1ijsVThknXT"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 15. lp_pyth_price_account
                            {
                                pubkey: new PublicKey(
                                    "jnNMpLbMMLDCYJmxJa2RuArEsLrtLKN1c1yjMuvjFsE"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 16. vault_account
                            {
                                pubkey: new PublicKey(
                                    "91M42pKURwf4VQHACzx1VFZ8PGZgW2RDwPkwbBk8peGU"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                            // 17. position_info_account
                            {
                                pubkey: new PublicKey(
                                    "6gMyHy6v24wzgLVADTEcnyC3TNMsnUGqsLFNR6MSbw7m"
                                ),
                                isWritable: true,
                                isSigner: false,
                            },
                        ],
                    }
                );

                console.log(`beginDepositChamber tx: ${tx} `);
            } catch (_error) {
                console.log("Failed to deposit into chamber!");
            } */
        }
    };

    return (
        <form className="farm-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-items">
                <div className="form-item">
                    <div className="form-item-label">
                        Available balance: <span>{solBalance}</span>
                    </div>
                    <div className="form-item-input">
                        <input
                            type="text"
                            className="item-input"
                            placeholder="0.00"
                            value={value}
                            {...register("number1", { required: true })}
                            onChange={handleChange}
                            onClick={(event) => addClass(event, "touched")}
                        />
                        <div className="item-input-icon">
                            <img src={SolLogo} width="30" height="30" alt="" />
                        </div>
                        <div className="item-input-text">SOL</div>
                    </div>
                    <div className="form-item-controls">
                        <a
                            className="item-control"
                            onClick={() => changeValue(25)}
                        >
                            25%
                        </a>
                        <a
                            className="item-control"
                            onClick={() => changeValue(50)}
                        >
                            50%
                        </a>
                        <a
                            className="item-control"
                            onClick={() => changeValue(75)}
                        >
                            75%
                        </a>
                        <a
                            className="item-control"
                            onClick={() => changeValue(100)}
                        >
                            100%
                        </a>
                    </div>
                </div>
                <div className="form-item">
                    <div className="form-item-label">
                        Available balance: <span>{usdcBalance}</span>
                    </div>
                    <div className="form-item-input">
                        <input
                            type="text"
                            className="item-input"
                            placeholder="0.00"
                            value={secondValue}
                            {...register("number2", { required: true })}
                            onChange={handleSecondChange}
                            onClick={(event) => addClass(event, "touched")}
                        />
                        <div className="item-input-icon">
                            <img src={UsdcLogo} width="30" height="30" alt="" />
                        </div>
                        <div className="item-input-text">USDC</div>
                    </div>
                    <div className="form-item-controls">
                        <a
                            className="item-control"
                            onClick={() => changeSecondValue(25)}
                        >
                            25%
                        </a>
                        <a
                            className="item-control"
                            onClick={() => changeSecondValue(50)}
                        >
                            50%
                        </a>
                        <a
                            className="item-control"
                            onClick={() => changeSecondValue(75)}
                        >
                            75%
                        </a>
                        <a
                            className="item-control"
                            onClick={() => changeSecondValue(100)}
                        >
                            100%
                        </a>
                    </div>
                </div>
            </div>
            <div className="farm-form-submit">
                <button type="submit">
                    {formProp ? "Add Collateral" : "Farm"}
                </button>
            </div>
        </form>
    );
}

export default form;
