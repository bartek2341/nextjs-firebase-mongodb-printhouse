import { useState } from "react";
import { useMobile } from "@/hooks/index";
import useTranslation from "next-translate/useTranslation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  Wrapper,
  Button,
  Buttons,
  DeleteProductModal,
} from "@/components/index";
import { respondTo, formatCurrency } from "@/lib/index";
import { BasketList, BasketTable } from "@/components/pages/basketPage/index";

const BasketItems = ({ products, deleteProduct, cartCost }) => {
  let { t, lang } = useTranslation();
  const isMobile = useMobile();
  const [deleteProductId, setDeleteProductId] = useState(null);
  const { net, gross, currency } = cartCost;

  const basketItems = isMobile ? (
    <BasketList products={products} setDeleteProductId={setDeleteProductId} />
  ) : (
    <BasketTable products={products} setDeleteProductId={setDeleteProductId} />
  );

  return (
    <>
      <BasketItemsWrapper>
        <h2>
          <FontAwesomeIcon
            icon={faShoppingCart}
            alt={t("common:basket")}
            title={t("common:basket")}
          />
          {t("common:basket")}
        </h2>
        {basketItems}
        <CartCost>
          <div>
            {t("basket:total")}: {formatCurrency(net, currency, lang)}{" "}
            {t("common:net")} / {formatCurrency(gross, currency, lang)}{" "}
            {t("common:gross")}
          </div>
          <Buttons right>
            <Button responsive variant="link" href="/">
              {t("basket:continueShopping")}
            </Button>
            <Button
              responsive
              green
              variant="link"
              href={`/${t("common:realizationPath")}`}
            >
              {t("basket:completeOrder")}
            </Button>
          </Buttons>
        </CartCost>
      </BasketItemsWrapper>
      {deleteProductId && (
        <DeleteProductModal
          setDeleteProductId={setDeleteProductId}
          deleteProductId={deleteProductId}
          deleteProduct={deleteProduct}
        />
      )}
    </>
  );
};

export default BasketItems;

export const BasketItemsWrapper = styled(Wrapper)`
  h2 {
    display: flex;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    svg {
      margin-right: ${({ theme }) => theme.spacing.xs};
      font-size: ${({ theme }) => theme.fontSizes.titleMd};
    }
  }
`;

export const CartCost = styled.div`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
   align-items: flex-end;
  `}
`;
