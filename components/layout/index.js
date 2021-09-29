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
      </Head>
      <Nav />
      {isHomePagePage && <Header />}
      <main>{children}</main>
      {!isLoginOrSignupPage && <Footer />}
    </>
  );
};

export default Layout;
