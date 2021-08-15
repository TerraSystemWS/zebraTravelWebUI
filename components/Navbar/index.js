import scss from "./navbar.module.scss";
import Link from "next/link";
import { useState } from "react";
import Hr from "../Hr";
import { i18n, withTranslation } from "../../i18n";
import { unsetToken } from "../../lib/auth";
import { useUser } from "../../lib/user";
import api from "../../lib/api";
import { useRouter } from "next/router";

let isEmpty = (val) => {
    let typeOfVal = typeof val;
    switch (typeOfVal) {
        case "object":
            return val.length == 0 || !Object.keys(val).length;
            break;
        case "string":
            let str = val.trim();
            return str == "" || str == undefined;
            break;
        case "number":
            return val == "";
            break;
        default:
            return val == "" || val == undefined;
    }
};

const NavBar = ({ t }) => {
    const router = useRouter();
    const [open, Isopen] = useState(false);
    const [active, Isactive] = useState(false);
    // const [scale, setScale] = useState(0.6);
    const { user, loading } = useUser();
    const { response, error, isLoading } = api("/api/links");

    // console.log("router.query:");
    // console.log(isEmpty(router.query));
    let url;
    let uri;
    let redi = null;
    if (isEmpty(router.query)) {
        url = router.pathname;
    } else {
        uri = router.pathname;
        const { id } = router.query;
        url = uri.replace("[id]", id);
        redi = 1;
    }

    let siclass;
    let show;
    let icon;
    const styles = {
        transition: "all 1s ease-out"
    };

    if (open) {
        siclass = scss.noactive;
        show = "";
        icon = <img src="/img/close.png" />;
    } else {
        show = scss.show;
        siclass = scss.active;
        icon = <img src="/img/bars.png" />;
    }

    const handleClick = () => {
        Isopen(!open);
        // setScale(scale > 0.6 ? 0.6 : 0.999);
    };

    const logout = () => {
        unsetToken();
        // alert("logout");
    };

    const dropDown = () => {
        alert("clicado");
        Isactive(!active);
    };

    let arrowIcon;
    if (active) {
        arrowIcon = <i class="fas fa-angle-down" aria-hidden="true"></i>;
    } else {
        arrowIcon = <i class="fas fa-angle-down" aria-hidden="true"></i>;
    }

    // transition: all 5s ease-in;
    // transform: scale(1.3);

    return (
        <>
            <nav className={scss.nav}>
                {/* <div className={scss.item}></div> */}
                <div className={scss.item} style={{ marginLeft: "6%" }}>
                    <div class={active ? "dropdown is-active" : "dropdown "}>
                        <div class="dropdown-trigger">
                            <button
                                class="button"
                                aria-haspopup="true"
                                aria-controls="dropdown-menu"
                                onClick={dropDown}
                            >
                                <span> {t("prod")} </span>
                                <span class="icon is-small">{arrowIcon}</span>
                            </button>
                        </div>
                        <div
                            class="dropdown-menu"
                            id="dropdown-menu"
                            role="menu"
                        >
                            <div class="dropdown-content">
                                <Link href="/experiencias">
                                    <a style={{ width: "128%" }}>
                                        {t("exp")}{" "}
                                        {/*<i className="fas fa-chevron-down"></i>*/}
                                    </a>
                                </Link>
                                <a class="dropdown-item">Other dropdown item</a>
                                <a href="#" class="dropdown-item is-active">
                                    Casa Colonial
                                </a>
                                <a href="#" class="dropdown-item">
                                    Casa Koening
                                </a>
                                <hr class="dropdown-divider" />
                                <a href="#" class="dropdown-item">
                                    With a divider
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={scss.item} style={{ marginLeft: "6%" }}>
                    <Link href="/servicos">
                        <a>{t("serv")}</a>
                    </Link>
                </div>
                <div className={scss.item} style={{ marginLeft: "6%" }}>
                    <Link href="/post">
                        <a>Blog</a>
                    </Link>
                </div>
                <div className={scss.item} style={{ marginLeft: "15%" }}>
                    <Link href="/contacto">
                        <a>{t("cont")}</a>
                    </Link>
                </div>
                {/* <div className={scss.item}></div> */}
                <div
                    className={scss.item + " " + siclass}
                    onClick={handleClick}
                >
                    {icon}
                </div>
                <div
                    className={scss.dropMenu + " " + show}
                    style={{
                        ...styles
                    }}
                >
                    <div className={scss.boxcontainer}>
                        <div className={scss.box1}>
                            <span
                                onClick={() => i18n.changeLanguage("pt")}
                                style={{
                                    cursor:
                                        i18n.language == "pt" ? "unset" : " ",
                                    fontWeight:
                                        i18n.language == "pt" ? "unset" : " "
                                }}
                            >
                                PT
                            </span>
                            <span
                                onClick={() => i18n.changeLanguage("en")}
                                style={{
                                    cursor:
                                        i18n.language == "en" ? "unset" : " ",
                                    fontWeight:
                                        i18n.language == "en" ? "unset" : " "
                                }}
                            >
                                EN
                            </span>
                            <span
                                onClick={() => i18n.changeLanguage("fr")}
                                style={{
                                    cursor:
                                        i18n.language == "fr" ? "unset" : " ",
                                    fontWeight:
                                        i18n.language == "fr" ? "unset" : " "
                                }}
                            >
                                FR
                            </span>
                        </div>
                        <div className={scss.box2}>
                            {!loading &&
                                (user ? (
                                    <p>{user}</p>
                                ) : (
                                    <Link
                                        href={`/auth/login?redirect=${redi}&url=${url}`}
                                    >
                                        <a>
                                            Log in
                                            <span className="icon">
                                                <i className="far fa-user"></i>
                                            </span>
                                        </a>
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <Hr height="1" opacidade="1" cor="#000000" width="79" />
                    <div className={scss.listMenu}>
                        <ul className="menu-list">
                            <li>
                                <img src="/img/logoCinza.svg" />
                            </li>
                            <li>
                                <Link href="">
                                    <a>{t("term")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a>{t("privac")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a>{t("nos")}</a>
                                </Link>
                            </li>
                            {!loading &&
                                (user ? (
                                    <>
                                        <li>
                                            <Link href="/myaccount/">
                                                <a>{t("mconta")}</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <a onClick={logout}>Logout</a>
                                        </li>
                                    </>
                                ) : (
                                    " "
                                ))}
                        </ul>
                    </div>
                    <div className={scss.social}>
                        <div className={scss.caxa}>
                            <a href={response?.facebook} target="_blank">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href={response?.instagram} target="_blank">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href={response?.youtube} target="_blank">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default withTranslation("navbar")(NavBar);
