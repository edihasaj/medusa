import {
  StoreGetProductsParams,
  StoreProductsListRes,
  StoreProductsRes,
} from "@applifyer/medusa"
import { Response } from "@applifyer/medusa-js"
import { useQuery } from "@tanstack/react-query"
import { useMedusa } from "../../../contexts"
import { UseQueryOptionsWrapper } from "../../../types"
import { queryKeysFactory } from "../../utils/index"

const PRODUCTS_QUERY_KEY = `products` as const

export const productKeys = queryKeysFactory<
  typeof PRODUCTS_QUERY_KEY,
  StoreGetProductsParams
>(PRODUCTS_QUERY_KEY)
type ProductQueryKey = typeof productKeys

export const useProducts = (
  query?: StoreGetProductsParams,
  options?: UseQueryOptionsWrapper<
    Response<StoreProductsListRes>,
    Error,
    ReturnType<ProductQueryKey["list"]>
  >
): StoreProductsListRes => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    productKeys.list(query),
    // @ts-ignore
    () => client.products.list(query),
    options
  )
  return { ...data, ...rest } as StoreProductsListRes
}

export const useProduct = (
  id: string,
  options?: UseQueryOptionsWrapper<
    Response<StoreProductsRes>,
    Error,
    ReturnType<ProductQueryKey["detail"]>
  >
): StoreProductsRes => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    productKeys.detail(id),
    // @ts-ignore
    () => client.products.retrieve(id),
    options
  )

  return { ...data, ...rest } as StoreProductsRes
}
