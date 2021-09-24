import useSWR from "swr";
import { fetcher } from "lib/index";

export function useProducts(initialData) {
  const { data } = useSWR(`/api/products`, fetcher, {
    initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return data;
}

export function useProductCategories(initialData) {
  const { data } = useSWR(`/api/products/categories`, fetcher, {
    initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return data;
}

export function useProductCategory(initialData, name) {
  const { data } = useSWR(`/api/products/categories/${name}`, fetcher, {
    initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return data;
}

export function useCategoryProducts(initialData, name) {
  const { data } = useSWR(`/api/products/categoryProducts/${name}`, fetcher, {
    initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return data;
}

export function useProduct(initialData, product) {
  const { data } = useSWR(`/api/products/${product}`, fetcher, {
    initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return data;
}
