import React from "react";
import "./portfoliorow.scss";
import RaydiumLogo from "./../../assets/R.svg";
import UsdcLogo from "./../../assets/usdc.svg";
import { Link } from "react-router-dom";
import tulpan from "./../../assets/tulpan.svg";
import SolLogo from "./../../assets/sol.svg";
// import settings from "./../../assets/settings.svg";
// import share from "./../../assets/share.svg";

function PortfolioRow(props: any) {
    return (
        <tr className="poolrow">
            <td className="poolrow-title portfolio-row-title">
                <div className="poolrow-title-icons">
                    <div className="title-icon">
                        <img width={27} height={27} src={SolLogo} alt="" />
                    </div>
                    <div className="title-icon">
                        <img width={27} height={27} src={UsdcLogo} alt="" />
                    </div>
                </div>
                <div className="poolrow-title-text">
                    <div className="title-text">SOL-USDC</div>
                    <div className="title-subtitles">
                        <div className="title-subtitle">
                            <div className="subtitle-icon">
                                <img
                                    width={11}
                                    height={11}
                                    src={RaydiumLogo}
                                    alt=""
                                />
                            </div>
                            <div className="subtitle-text">Raydium</div>
                        </div>
                        <span>/</span>
                        <div className="title-subtitle">
                            <div className="subtitle-icon">
                                <img
                                    width={11}
                                    height={11}
                                    src={tulpan}
                                    alt=""
                                />
                            </div>
                            <div className="subtitle-text">Tulip</div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="poolrow-apy portfolio-apy">36.22%</td>
            <td className="poolrow-tvl">
                <div className="tvl-title position">${props.value}</div>
            </td>
            <td className="poolrow-yild">
                <div className="row-farmed-title">$0.0</div>
                <div className="row-farmed-subtitle">
                    <span>0$</span> Since Yesterday
                </div>
            </td>
            <td className="poolrow-strategy">
                <div className="strategy-title portfolio-strategy">
                    Delta Neutral
                </div>
            </td>
            <td className="poolrow-control portfolio-controls">
                <Link to={"/add-collateral/"} className="icon-control">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_626_3069)">
                            <path
                                d="M19.1548 7.47036H17.5949C17.4684 7.13145 17.3418 6.79253 17.1744 6.49854L18.2728 5.40013C18.6117 5.0653 18.6117 4.55897 18.2728 4.22006L15.8228 1.77008C15.488 1.43116 14.9816 1.43116 14.6427 1.77008L13.5035 2.90932C13.2095 2.78273 12.8706 2.65615 12.5766 2.52957V0.924833C12.5766 0.459337 12.1968 0.0795898 11.7313 0.0795898H8.26868C7.80318 0.0795898 7.42344 0.459337 7.42344 0.924833V2.43974C7.08861 2.56632 6.79053 2.6929 6.49653 2.81948L5.35729 1.68024C5.02246 1.34133 4.51613 1.34133 4.17722 1.68024L1.72724 4.13022C1.38832 4.46505 1.38832 4.97138 1.72724 5.3103L2.82564 6.4087C2.65823 6.74762 2.53165 7.04162 2.40506 7.38053H0.845243C0.379747 7.38053 0 7.76028 0 8.22577V11.6884C0 12.1539 0.379747 12.5337 0.845243 12.5337H2.27848C2.40506 12.8726 2.53165 13.2074 2.69906 13.5463L1.64557 14.5998C1.47815 14.7672 1.17191 15.2654 1.64557 15.7799L4.09555 18.2299C4.43038 18.5688 4.93671 18.5688 5.27562 18.2299L6.28828 17.2172C6.62311 17.4295 6.96203 17.5561 7.34177 17.6827V19.0751C7.34177 19.5406 7.72152 19.9203 8.18701 19.9203H11.6497C12.1151 19.9203 12.4949 19.5406 12.4541 19.1649V17.7725C12.7889 17.6459 13.1686 17.4744 13.5076 17.307L14.5202 18.3197C14.855 18.6586 15.3614 18.6586 15.7003 18.3197L18.1503 15.8697C18.4892 15.5349 18.4892 15.0285 18.1503 14.6896L17.0968 13.6361C17.2642 13.2972 17.3908 12.9624 17.5174 12.6235H19.1548C19.6203 12.6235 20 12.2437 20 11.7782V8.3156C20 7.85011 19.6203 7.47036 19.1548 7.47036ZM18.1952 10.8922H16.9294C16.5496 10.8922 16.2148 11.1453 16.129 11.5251C15.9575 12.158 15.7493 12.7501 15.4104 13.2972C15.198 13.6361 15.2838 14.0567 15.537 14.3099L16.423 15.196L15.1572 16.4618L14.312 15.6165C14.0588 15.3225 13.6382 15.2776 13.2993 15.49C12.7072 15.8289 12.1151 16.082 11.4822 16.2495C11.1025 16.3311 10.8493 16.67 10.8493 17.0498V18.2748H9.03226V18.2707H8.99142V17.0457C8.99142 16.666 8.73826 16.3311 8.35851 16.2454C7.72152 16.078 7.08861 15.8248 6.54145 15.4859C6.20253 15.2735 5.78195 15.3593 5.52879 15.6125L4.68354 16.4577L3.41772 15.1919L4.3038 14.3058C4.55696 14.0118 4.64271 13.6321 4.43038 13.2931C4.09147 12.746 3.8383 12.1539 3.71172 11.521C3.63005 11.1412 3.29114 10.8881 2.91139 10.8881H1.64557V9.07101H2.99714C3.37689 9.07101 3.71172 8.81785 3.79747 8.4381C3.92405 7.84602 4.17722 7.29478 4.51613 6.74762C4.72846 6.4087 4.64271 5.98812 4.38955 5.73496L3.41772 4.76313L4.68354 3.49731L5.65537 4.46914C5.94937 4.7223 6.32911 4.80805 6.66803 4.59572C7.21927 4.30172 7.76644 4.04856 8.35851 3.92197C8.73826 3.84031 8.99142 3.50139 8.99142 3.12165V1.72924H10.8085V3.16656C10.8085 3.54631 11.0617 3.88114 11.4414 3.96689C12.0335 4.09347 12.6256 4.34664 13.1319 4.64064C13.4708 4.85297 13.8914 4.76722 14.1445 4.51405L15.1572 3.50139L16.423 4.76722L15.4512 5.73904C15.1572 5.99221 15.1123 6.41279 15.3246 6.7517C15.6227 7.26211 15.8759 7.85011 16.0433 8.44219C16.1249 8.82193 16.4639 9.0751 16.8436 9.0751H18.1952V10.8922Z"
                                fill="#7173FC"
                            />
                            <path
                                d="M9.91828 5.40015C7.38664 5.40015 5.31641 7.47038 5.31641 10.002C5.31641 12.5337 7.38664 14.6039 9.91828 14.6039C12.454 14.6039 14.5202 12.5337 14.5202 10.002C14.5202 7.47038 12.4499 5.40015 9.91828 5.40015ZM9.91828 12.9583C8.31355 12.9583 6.96198 11.6476 6.96198 10.002C6.96198 8.39729 8.27271 7.04572 9.91828 7.04572C11.5639 7.04572 12.8746 8.35646 12.8746 10.002C12.8746 11.6068 11.523 12.9583 9.91828 12.9583Z"
                                fill="#7173FC"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_626_3069">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
                <a className="icon-control share">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20.7363 11.3715L13.5363 4.26037C13.4105 4.13605 13.2501 4.05139 13.0756 4.01709C12.901 3.98278 12.72 4.00038 12.5556 4.06765C12.3911 4.13492 12.2506 4.24884 12.1517 4.395C12.0528 4.54117 12 4.71302 12 4.88881V8.03985C9.54149 8.26461 7.25634 9.38736 5.59176 11.1884C3.92718 12.9894 3.00298 15.3392 3 17.7777V19.111C2.99999 19.2956 3.05816 19.4757 3.16646 19.6261C3.27475 19.7766 3.42779 19.89 3.60432 19.9507C3.78086 20.0113 3.97213 20.0162 4.15159 19.9646C4.33104 19.913 4.48978 19.8075 4.60577 19.6627C5.48745 18.6271 6.56926 17.7754 7.78798 17.1574C9.00671 16.5394 10.3379 16.1674 11.7038 16.0633C11.7487 16.0577 11.8612 16.049 12 16.0403V19.111C12 19.2868 12.0528 19.4587 12.1517 19.6049C12.2506 19.751 12.3911 19.8649 12.5556 19.9322C12.72 19.9995 12.901 20.0171 13.0756 19.9828C13.2501 19.9485 13.4105 19.8638 13.5363 19.7395L20.7363 12.6284C20.8199 12.5459 20.8862 12.4479 20.9315 12.3401C20.9767 12.2322 21 12.1166 21 11.9999C21 11.8832 20.9767 11.7676 20.9315 11.6598C20.8862 11.552 20.8199 11.454 20.7363 11.3715ZM13.8 16.9652V15.111C13.8001 14.9943 13.7768 14.8787 13.7316 14.7708C13.6864 14.663 13.6201 14.565 13.5365 14.4824C13.4529 14.3999 13.3537 14.3344 13.2445 14.2898C13.1353 14.2451 13.0182 14.2221 12.9 14.2222C12.6706 14.2222 11.7337 14.266 11.4947 14.2977C9.06878 14.5184 6.75963 15.4286 4.84659 16.9183C5.06361 14.9577 6.00527 13.1451 7.49125 11.8275C8.97723 10.51 10.9031 9.78012 12.9 9.7777C13.0182 9.77773 13.1353 9.75476 13.2445 9.7101C13.3537 9.66544 13.4529 9.59997 13.5365 9.51742C13.6201 9.43488 13.6864 9.33687 13.7316 9.22901C13.7768 9.12116 13.8001 9.00555 13.8 8.88882V7.03465L18.8274 11.9999L13.8 16.9652Z"
                            fill="#7173FC"
                        />
                    </svg>
                </a>
                <Link to={"/add-collateral/close-position"} className="control">
                    Withdraw
                </Link>
            </td>
        </tr>
    );
}

export default PortfolioRow;
