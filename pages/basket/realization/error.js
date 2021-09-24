import { Wrapper, Button } from "@/components/index";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const RealizationSuccessPage = () => {
  let { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("realization:createOrderError")}</title>
      </Head>
      <PageWrapper>
        <h2>
          <FontAwesomeIcon
            icon={faTimes}
            title={t("common:error")}
            alt={t("common:error")}
          />{" "}
          {t("realization:createOrderError")}.
        </h2>
        <Button
          variant="secondaryLink"
          href={`/${t("realization:realizationPath")}`}
        >
          {t("realization:tryAgain")}
        </Button>
        .
      </PageWrapper>
    </>
  );
};

export default RealizationSuccessPage;

const PageWrapper = styled(Wrapper)`
  text-align: center;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  a {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  svg {
    color: ${({ theme }) => theme.colors.red};
  }
`;
