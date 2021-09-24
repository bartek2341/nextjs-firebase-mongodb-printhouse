import { createPortal } from "react-dom";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Button, Buttons } from "@/components/index";

const DeleteOrderModal = ({ setDeleteOrderId, deleteOrderId, deleteOrder }) => {
  let { t } = useTranslation();
  return createPortal(
    <Wrapper onClick={() => setDeleteOrderId(null)}>
      <Content onClick={(e) => e.stopPropagation()}>
        <p>
          {t("account:confirmDeleteOrder")} {deleteOrderId} ?
        </p>
        <Buttons center>
          <Button
            variant="tertiary"
            onClick={() => {
              deleteOrder(deleteOrderId);
              setDeleteOrderId(null);
            }}
          >
            {t("common:yes")}
          </Button>
          <Button variant="tertiary" onClick={() => setDeleteOrderId(null)}>
            {t("common:no")}
          </Button>
        </Buttons>
      </Content>
    </Wrapper>,
    document.querySelector("#modal")
  );
};
export default DeleteOrderModal;

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
