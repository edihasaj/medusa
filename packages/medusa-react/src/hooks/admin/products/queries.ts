import {
  AdminGetProductsParams,
  AdminProductsListRes,
  AdminProductsListTagsRes,
  AdminProductsRes,
} from "@applifyer/medusa"
import { Response } from "@applifyer/medusa-js"
import { useQuery } from "@tanstack/react-query"
import { useMedusa } from "../../../contexts"
import { UseQueryOptionsWrapper } from "../../../types"
import { queryKeysFactory } from "../../utils/index"

const ADMIN_PRODUCTS_QUERY_KEY = `admin_products` as const

export const adminProductKeys = queryKeysFactory(ADMIN_PRODUCTS_QUERY_KEY)

type ProductQueryKeys = typeof adminProductKeys

export const useAdminProducts = (
  query?: AdminGetProductsParams,
  options?: UseQueryOptionsWrapper<
    Response<AdminProductsListRes>,
    Error,
    ReturnType<ProductQueryKeys["list"]>
  >
): AdminProductsListRes => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    adminProductKeys.list(query),
    // @ts-ignore
    () => client.admin.products.list(query),
    options
  )
  return { ...data, ...rest } as AdminProductsListRes
}

export const useAdminProduct = (
  id: string,
  options?: UseQueryOptionsWrapper<
    Response<AdminProductsRes>,
    Error,
    ReturnType<ProductQueryKeys["detail"]>
  >
) => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    adminProductKeys.detail(id),
    // @ts-ignore
    () => client.admin.products.retrieve(id),
    options
  )
  return { ...data, ...rest } as const
}

export const useAdminProductTagUsage = (
  options?: UseQueryOptionsWrapper<
    Response<AdminProductsListTagsRes>,
    Error,
    ReturnType<ProductQueryKeys["detail"]>
  >
) => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    adminProductKeys.detail("tags"),
    () => client.admin.products.listTags(),
    options
  )
  return { ...data, ...rest } as const
}
