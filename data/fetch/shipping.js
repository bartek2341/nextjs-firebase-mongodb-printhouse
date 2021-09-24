export const shippingFetch = (products) => {
  const promise = fetch(`/api/shipping`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(products),
  });
  return promise;
};
