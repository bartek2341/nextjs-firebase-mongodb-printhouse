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

const OrdersTable = ({
  orders,
  user: currentUser,
  setDeleteOrderId,
  setOrder,
  handlePayment,
  onSubmit,
}) => {
  let { t, lang } = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>{t("account:orderId")}</th>
          {currentUser.isAdmin && <th>{t("account:user")}</th>}
          <th>{t("account:orderStatus")}</th>
          <th>{t("account:created")}</th>
          <th>{t("account:more")}</th>
          {canUpdateOrder(currentUser) && <th>{t("account:changeStatus")}</th>}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const { _id, status, createdAt, user } = order;
          return (
            <tr key={_id}>
              <td>{_id}</td>
              {currentUser.isAdmin && <Owner>{user.email}</Owner>}
              <td>
                <OrderStatus variant={status} />
              </td>
              <td>{formatDate(createdAt)}</td>
              <td>
                <Buttons>
                  <ViewButton onClick={() => setOrder(order)} />
                  {canDeleteOrder(order, currentUser) && (
                    <DeleteButton onClick={() => setDeleteOrderId(_id)} />
                  )}
                  {canPayOrder(order, currentUser) && (
                    <PaymentButton
                      onClick={() => handlePayment(order._id, t, lang)}
                    />
                  )}
                </Buttons>
              </td>
              {canUpdateOrder(currentUser) && (
                <td>
                  <ChangeStatusForm
                    status={status}
                    onSubmit={onSubmit}
                    id={_id}
                  />
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default OrdersTable;

const Table = styled.table`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  thead {
    text-align: left;
  }
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  }
  td,
  th {
    vertical-align: top;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Owner = styled.td`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;
