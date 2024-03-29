import css from "./styles/contacto.module.scss";
import Layout from "../components/layout";
import ContactForm from "../components/Contact";
import { useFetchUser } from "../lib/user";
import Head from "next/head";
import Link from "next/link";
import Zebralistras from "../components/Zebralistras";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import api from "../lib/api";
const qs = require("qs");

const Contacto = ({ contatoDados, linkSocial }) => {
    const { user, loading } = useFetchUser();
    const { t } = useTranslation("contacto");
    // const { response } = api("/api/contato");

    // console.log("dados");
    // console.log(dados);

    const Newdata = contatoDados?.data.attributes || null;

    // remove todos os espaços contidos no numero
    const phone = Newdata.phone.replace(/ /g, "") || null;

    return (
        <Layout user={user} navbarData={linkSocial} footerData={linkSocial}>
            <Head>
                <title>Contatos - Zebra Travel Agency</title>
                <link
                    rel="shortcut icon"
                    type="image/png"
                    href="/zebraicon.png"
                ></link>
            </Head>

            <section className={"container " + css.cont}>
                <div className={css.boxi}>
                    <Link href="/">
                        <a>
                            <figure className="image">
                                <img src="/img/zebralogo3.svg" />
                            </figure>
                        </a>
                    </Link>
                </div>
            </section>

            <Zebralistras />

            <section className={"container " + css.contTitle}>
                <h1 className="title">{t("contact")}</h1>
                <h2 className="subtitle">
                    <p>
                        <a href={"tel:00238" + phone}>
                            +|238| {Newdata?.phone}
                        </a>
                    </p>
                    <p>
                        <a href={"mailto:" + Newdata?.email}>
                            {Newdata?.email}
                        </a>
                    </p>
                </h2>
            </section>
            <section className={"container " + css.map}>
                <div className="columns is-desktop">
                    <div className="column">
                        <iframe src={Newdata?.MapPosition}></iframe>
                    </div>
                    <div className="column">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

// Contacto.getInitialProps = async () => {
//     const obj = { namespacesRequired: ["contacto", "footer", "navbar"] };

//     return obj;
// };
export const getServerSideProps = async ({ locale }) => {
    const query = qs.stringify(
        {
            populate: "*"
        },
        {
            encodeValuesOnly: true
        }
    );

    const url = `${process.env.API_BASE_URL}/contacto`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    // console.log("api response");
    // console.log(response);
    const contatoDados = await response.json();
    // console.log(dados);

    /**
     * Get dados para link de redes sociais
     */
    const urlRsociais = `${process.env.API_BASE_URL}/links-social?${query}`;
    const rsocial_res = await fetch(urlRsociais, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log("api response");
    // console.log(response);
    const rsocial_data = await rsocial_res.json();

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "contacto",
                "footer",
                "navbar"
            ])),
            contatoDados,
            linkSocial: rsocial_data //dados sobre os links das redes sociais
        }
    };
};

export default Contacto;
