export const updateUserFetch = (values) => {
  const promise = fetch(`/api/user/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return promise;
};

export const fetchAdminClaims = () => {
  const promise = fetch("/api/user/claims");
  return promise;
};
