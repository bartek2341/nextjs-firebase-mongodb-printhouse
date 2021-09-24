import { useState } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { toast } from "react-toastify";
import { useOrders, useMobile, usePagination } from "@/hooks/index";
import {
  orderSection,
  orderSort,
  deleteOrderFetch,
  ordersPerPage,
  updateOrderFetch,
} from "@/data/index";
import { PageTitle } from "@/components/pages/accountPage/index";
import OrdersTable from "./OrderTable";
import OrdersList from "./OrderList";
import { filterOrdersBySection, sortOrders, handlePayment } from "@/lib/index";
import { OrderModal, Pagination, DeleteOrderModal } from "@/components/index";

const Orders = ({ user }) => {
  let { t } = useTranslation();
  const isMobile = useMobile();
  const [orders, { mutate }] = useOrders();
  const [selectedSection, setSelectedSection] = useState(orderSection.current);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [sortBy, setSortBy] = useState(orderSort.latest);
  const sectionOrders = filterOrdersBySection(orders, selectedSection);
  const sortedOrders = sortOrders(sectionOrders, sortBy);
  const { next, prev, jump, currentData, currentPage, maxPage, reset } =
    usePagination(sortedOrders, ordersPerPage);

  const currentOrders = currentData();

  const deleteOrder = async (id) => {
    const res = await deleteOrderFetch(id);
    if (res.ok) {
      const orderId = await res.text();
      toast.success(t("account:deleteOrderSuccess"));
      mutate(
        orders.filter((ordr) => ordr._id !== orderId),
        false
      );
      currentOrders.length - 1 <= 0 && prev();
    } else {
      toast.error(t("account:deleteOrderError"));
    }
  };

  const onSubmit = async (values, id, form) => {
    const res = await updateOrderFetch(values, id);
    if (res.ok) {
      const json = await res.json();
      toast.success(t("account:updateOrderSuccess"));
      mutate(
        orders.map((ordr) => (ordr._id === json._id ? json : ordr)),
        false
      );
    } else {
      toast.error(t("account:updateOrderError"));
    }
    setTimeout(() => form.reset());
  };

  const userOrders = isMobile ? (
    currentOrders.map((order) => (
      <OrdersList
        key={order._id}
        order={order}
        setDeleteOrderId={setDeleteOrderId}
        setOrder={setOrder}
        handlePayment={handlePayment}
        onSubmit={onSubmit}
        user={user}
      />
    ))
  ) : (
    <OrdersTable
      orders={currentOrders}
      setDeleteOrderId={setDeleteOrderId}
      setOrder={setOrder}
      handlePayment={handlePayment}
      onSubmit={onSubmit}
      user={user}
    />
  );

  return (
    <>
      {deleteOrderId && (
        <DeleteOrderModal
          setDeleteOrderId={setDeleteOrderId}
          deleteOrderId={deleteOrderId}
          deleteOrder={deleteOrder}
        />
      )}
      {order && (
        <OrderModal order={order} setOrder={setOrder} currentUser={user} />
      )}
      <PageTitle>
        <h3>{t("account:orders")}</h3>
      </PageTitle>
      {!orders.length ? (
        <p>{t("account:noOrders")}</p>
      ) : (
        <>
          <Panel>
            <div>
              <div>
                {Object.values(orderSection).map((section) => (
                  <SectionButton
                    key={section}
                    onClick={() => {
                      setSelectedSection(section);
                      reset();
                    }}
                    isActive={selectedSection === section}
                  >
                    {t(`account:${section}`)}
                  </SectionButton>
                ))}
              </div>
              {sectionOrders.length > 0 && (
                <select
                  id="sort"
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    reset();
                  }}
                >
                  {Object.values(orderSort).map((sort) => (
                    <option key={sort} value={sort}>
                      {t(`account:${sort}`)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </Panel>
          {sectionOrders.length ? (
            <>
              {userOrders}
              <Pagination
                prev={prev}
                next={next}
                currentPage={currentPage}
                maxPage={maxPage}
                jump={jump}
              />
            </>
          ) : (
            <p>{t("account:noOrders")}</p>
          )}
        </>
      )}
    </>
  );
};

export default Orders;

const Panel = styled.div`
  overflow: hidden;
  height: 43px;
  & ~ p {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
  & > div {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: auto;
    white-space: nowrap;
    padding-top: ${({ theme }) => theme.spacing.xs};
    padding-left: ${({ theme }) => theme.spacing.xs};
    padding-right: ${({ theme }) => theme.spacing.xs};
    background-color: ${({ theme }) => theme.colors.gray.xlight};
    justify-content: space-between;
  }
`;

const SectionButton = styled.button`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : "transparent"};
  cursor: pointer;
  border: 1px solid transparent;
  border-top-left-radius: ${({ theme }) => theme.spacing.xs};
  border-top-right-radius: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  ${({ theme, isActive }) =>
    isActive &&
    `
   border-top-color: ${theme.colors.gray.light};
   border-left-color: ${theme.colors.gray.light};
   border-right-color: ${theme.colors.gray.light};
  `}
`;
