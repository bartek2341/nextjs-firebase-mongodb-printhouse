import { Wrapper, Button } from "@/components/index";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const PaymentErrorPage = () => {
  let { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("payment:paymentError")}</title>
      </Head>
      <PageWrapper>
        <h2>
          <FontAwesomeIcon
            icon={faTimes}
            title={t("common:error")}
            alt={t("common:error")}
          />{" "}
          {t("payment:paymentError")}.
        </h2>
        <p>
          {t("common:backTo")}{" "}
          <Button variant="secondaryLink" href={`/${t("common:ordersPath")}`}>
            {t("common:myOrders")}
          </Button>
          .
        </p>
      </PageWrapper>
    </>
  );
};

export default PaymentErrorPage;

const PageWrapper = styled(Wrapper)`
  text-align: center;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  svg {
    color: ${({ theme }) => theme.colors.red};
  }
`;
