import { Wrapper, Button } from "@/components/index";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const AccountIncompletedPage = () => {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("common:accountIncompleted")}</title>
      </Head>
      <PageWrapper>
        <h2>{t("common:accountIncompleted")}.</h2>
        <p>
          <Button variant="secondaryLink" href={`/${t("common:accountPath")}`}>
            {t("common:completeAccount")}.
          </Button>
        </p>
      </PageWrapper>
    </>
  );
};

export default AccountIncompletedPage;

const PageWrapper = styled(Wrapper)`
  text-align: center;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
