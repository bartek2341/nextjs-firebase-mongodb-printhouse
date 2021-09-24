import { Wrapper, Button } from "@/components/index";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const UnauthenticatedPage = () => {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("common:unauthenticated")}</title>
      </Head>
      <PageWrapper>
        <h2>{t("common:unauthenticated")}.</h2>
        <p>
          <Button variant="secondaryLink" href={`/${t("common:loginPath")}`}>
            {t("common:login")}
          </Button>{" "}
          {t("common:or")}{" "}
          <Button variant="secondaryLink" href={`/${t("common:signupPath")}`}>
            {t("common:signup")}.
          </Button>
        </p>
      </PageWrapper>
    </>
  );
};

export default UnauthenticatedPage;

const PageWrapper = styled(Wrapper)`
  text-align: center;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
