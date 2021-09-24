import { useEffect } from "react";
import { Wrapper, Button } from "@/components/index";
import { withRouter } from "next/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { clearBasket } from "@/data/index";
import Head from "next/head";

const RealizationSuccessPage = ({ router, clearBasket }) => {
  let { t } = useTranslation();
  const { orderId } = router.query;

  useEffect(() => {
    if (orderId) {
      clearBasket();
    }
  });
  return (
    <>
      <Head>
        <title>{t("realization:orderPlaced")}</title>
      </Head>
      <PageWrapper>
        <h2>
          <FontAwesomeIcon
            icon={faCheckCircle}
            title={t("common:success")}
            alt={t("common:success")}
          />{" "}
          {t("realization:orderPlaced")}.
        </h2>
        <p>
          {t("realization:orderId")}: <span>{orderId}</span>.
        </p>
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

export default connect(null, { clearBasket })(
  withRouter(RealizationSuccessPage)
);

const PageWrapper = styled(Wrapper)`
  text-align: center;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    span {
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.green};
  }
`;
