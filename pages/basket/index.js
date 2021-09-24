import { connect } from "react-redux";
import styled from "styled-components";
import { deleteProduct } from "@/data/index";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Wrapper } from "@/components/index";
import useTranslation from "next-translate/useTranslation";
import { BasketItems } from "@/components/pages/basketPage/index";
import Head from "next/head";

const BasketPage = ({ basket, deleteProduct }) => {
  let { t } = useTranslation();
  const { products, cartCost } = basket;

  return (
    <>
      <Head>
        <title>{t("common:basket")}</title>
      </Head>
      {!products.length ? (
        <BasketEmpty>
          <FontAwesomeIcon
            icon={faShoppingCart}
            alt={t("common:basket")}
            title={t("common:basket")}
          />
          <h2>{t("basket:basketEmpty")}.</h2>
          <p>
            {t("common:goTo")}{" "}
            <Button variant="secondaryLink" href="/">
              {t("basket:productList")}.
            </Button>
          </p>
        </BasketEmpty>
      ) : (
        <BasketItems
          products={products}
          cartCost={cartCost}
          deleteProduct={deleteProduct}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, { deleteProduct })(BasketPage);

export const BasketEmpty = styled(Wrapper)`
  text-align: center;
  padding: 100px 0;
  svg {
    font-size: ${({ theme }) => theme.fontSizes.header};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
