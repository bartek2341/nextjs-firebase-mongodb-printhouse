import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { OrderStatus, Buttons } from "@/components/index";
import {
  formatDate,
  canDeleteOrder,
  canPayOrder,
  canUpdateOrder,
} from "@/lib/index";
import { ViewButton, DeleteButton, PaymentButton } from "./Buttons";
import ChangeStatusForm from "./ChangeStatusForm";

const OrdersList = ({
  order,
  user: currentUser,
  setDeleteOrderId,
  setOrder,
  handlePayment,
  onSubmit,
}) => {
  let { t, lang } = useTranslation();
  const { _id, status, createdAt, user } = order;
  return (
    <List>
      <li>
        {t("account:orderId")}: {_id}
      </li>
      {currentUser.isAdmin && (
        <Owner>
          {t("account:user")}: {user.email}
        </Owner>
      )}
      <li>
        {t("account:orderStatus")}: <OrderStatus variant={status} />
      </li>
      <li>
        {t("account:created")}: {formatDate(createdAt)}
      </li>
      <li>
        <Buttons>
          <ViewButton onClick={() => setOrder(order)} />
          {canDeleteOrder(order, currentUser) && (
            <DeleteButton onClick={() => setDeleteOrderId(_id)} />
          )}
          {canPayOrder(order, currentUser) && (
            <PaymentButton onClick={() => handlePayment(order._id, t, lang)} />
          )}
        </Buttons>
      </li>
      {canUpdateOrder(currentUser) && (
        <li>
          {t("account:changeStatus")}:{" "}
          <ChangeStatusForm status={status} onSubmit={onSubmit} id={_id} />
        </li>
      )}
    </List>
  );
};

export default OrdersList;

const List = styled.ul`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray.xlight};
`;

const Owner = styled.li`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;
