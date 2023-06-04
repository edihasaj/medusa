import {
  StoreGetShippingOptionsParams,
  StoreShippingOptionsListRes,
} from "@applifyer/medusa"
import { Response } from "@applifyer/medusa-js"
import { useQuery } from "@tanstack/react-query"
import { useMedusa } from "../../../contexts"
import { UseQueryOptionsWrapper } from "../../../types"
import { queryKeysFactory } from "../../utils/index"

const SHIPPING_OPTION_QUERY_KEY = `shipping_options` as const

const shippingOptionKey = {
  ...queryKeysFactory(SHIPPING_OPTION_QUERY_KEY),
  cart: (cartId: string) => [...shippingOptionKey.all, "cart", cartId] as const,
}

type ShippingOptionQueryKey = typeof shippingOptionKey

export const useShippingOptions = (
  query?: StoreGetShippingOptionsParams,
  options?: UseQueryOptionsWrapper<
    Response<StoreShippingOptionsListRes>,
    Error,
    ReturnType<ShippingOptionQueryKey["list"]>
  >
): StoreShippingOptionsListRes => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    shippingOptionKey.list(query),
    // @ts-ignore
    async () => client.shippingOptions.list(query),
    options
  )
  return { ...data, ...rest } as StoreShippingOptionsListRes
}

export const useCartShippingOptions = (
  cartId: string,
  options?: UseQueryOptionsWrapper<
    Response<StoreShippingOptionsListRes>,
    Error,
    ReturnType<ShippingOptionQueryKey["cart"]>
  >
): StoreShippingOptionsListRes => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    shippingOptionKey.cart(cartId),
    // @ts-ignore
    async () => client.shippingOptions.listCartOptions(cartId),
    options
  )
  return { ...data, ...rest } as StoreShippingOptionsListRes
}
