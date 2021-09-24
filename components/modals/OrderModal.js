import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { Order, Button } from "@/components/index";

const OrderModal = ({ order, setOrder, currentUser }) => {
  let { t } = useTranslation();
  let targetElement = useRef(null);

  useEffect(() => {
    disableBodyScroll(targetElement);
    return () => clearAllBodyScrollLocks();
  });

  return createPortal(
    <Wrapper onClick={() => setOrder(null)}>
      <Content onClick={(e) => e.stopPropagation()} ref={targetElement}>
        <Button id="close" variant="delete" onClick={() => setOrder(null)}>
          <FontAwesomeIcon
            icon={faTimes}
            alt={t("common:close")}
            title={t("common:close")}
          />
        </Button>
        <Order order={order} currentUser={currentUser} />
      </Content>
    </Wrapper>,
    document.querySelector("#modal")
  );
};
export default OrderModal;

const Wrapper = styled.aside`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 100;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.darken};
  #close {
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
  }
`;

const Content = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.spacing.md} 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 70%;
  max-width: 700px;
  padding: ${({ theme }) => theme.spacing.lg};
`;
