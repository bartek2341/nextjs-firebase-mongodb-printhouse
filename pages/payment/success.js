import { Wrapper, Button } from "@/components/index";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const PaymentSuccessPage = () => {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("payment:orderPaid")}</title>
      </Head>
      <PageWrapper>
        <h2>
          <FontAwesomeIcon
            icon={faCheckCircle}
            title={t("common:success")}
            alt={t("common:success")}
          />{" "}
          {t("payment:orderPaid")}.
        </h2>
        <p>
          {t("common:goTo")}{" "}
          <Button variant="secondaryLink" href={`/${t("common:ordersPath")}`}>
            {t("common:myOrders")}
          </Button>
          .
        </p>
      </PageWrapper>
    </>
  );
};

export default PaymentSuccessPage;

const PageWrapper = styled(Wrapper)`
  text-align: center;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  svg {
    color: ${({ theme }) => theme.colors.green};
  }
`;
