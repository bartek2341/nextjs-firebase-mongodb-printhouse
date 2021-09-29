import { useRouter } from "next/router";
import { Nav, Header, Footer } from "@/components/index";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const Layout = ({ children }) => {
  let { t } = useTranslation();
  const router = useRouter();
  const path = router.pathname;
  const isHomePagePage = path === "/" || path === "/[product]/[category]";
  const isLoginOrSignupPage = path === "/login" || path === "/signup";

  return (
    <>
      <Head>
        <meta name="description" content={t("common:metaDescription")} />
        <meta
          name="google-site-verification"
          content="T25R_QKlq6sbw6UKPnI8wu8L_UG7M7T9nn6kyn0WO8E"
        />
      </Head>
      <Nav />
      {isHomePagePage && <Header />}
      <main>{children}</main>
      {!isLoginOrSignupPage && <Footer />}
    </>
  );
};

export default Layout;
