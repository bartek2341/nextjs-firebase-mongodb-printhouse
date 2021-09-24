import useSWR from "swr";
import { fetcher } from "lib/index";

export function useOrders() {
  const { data, mutate } = useSWR(`/api/orders`, fetcher, {
    suspense: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return [data, { mutate }];
}
