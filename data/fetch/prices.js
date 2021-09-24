export const pricesFetch = (values, product) => {
  const promise = fetch(`/api/prices/${product}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return promise;
};
