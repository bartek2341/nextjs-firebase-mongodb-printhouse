import { createPortal } from "react-dom";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Button, Buttons } from "@/components/index";

const DeleteProductModal = ({
  setDeleteProductId,
  deleteProductId,
  deleteProduct,
}) => {
  let { t } = useTranslation();
  return createPortal(
    <Wrapper onClick={() => setDeleteProductId(null)}>
      <Content onClick={(e) => e.stopPropagation()}>
        <p>{t("basket:confirmDeleteProduct")} ?</p>
        <Buttons>
          <Button
            variant="tertiary"
            onClick={() => {
              deleteProduct(deleteProductId);
              setDeleteProductId(null);
            }}
          >
            {t("common:yes")}
          </Button>
          <Button variant="tertiary" onClick={() => setDeleteProductId(null)}>
            {t("common:no")}
          </Button>
        </Buttons>
      </Content>
    </Wrapper>,
    document.querySelector("#modal")
  );
};
export default DeleteProductModal;

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.darken};
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  width: 70%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.lg};
`;
