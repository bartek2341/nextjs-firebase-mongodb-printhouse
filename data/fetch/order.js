import { orderTimeout } from "@/data/index";

export const createOrderFetch = (values) => {
  const promise = fetch(
    "/api/orders/create",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
    orderTimeout
  );
  return promise;
};

export const deleteOrderFetch = (orderId) => {
  const promise = fetch(
    `/api/orders/${orderId}/delete`,
    {
      method: "DELETE",
    },
    orderTimeout
  );
  return promise;
};

export const deleteUserOrdersFetch = () => {
  const promise = fetch(
    `/api/orders/delete`,
    {
      method: "DELETE",
    },
    orderTimeout
  );
  return promise;
};

export const updateOrderFetch = (status, orderId) => {
  const promise = fetch(`/api/orders/${orderId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
  return promise;
};

export const payOrderFetch = (orderId, lang) => {
  const promise = fetch(`/api/orders/${orderId}/pay`, {
    method: "GET",
    headers: { "Content-Language": lang },
  });
  return promise;
};
