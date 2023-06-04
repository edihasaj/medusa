import {
  AdminShippingProfilesListRes,
  AdminShippingProfilesRes,
} from "@applifyer/medusa"
import { Response } from "@applifyer/medusa-js"
import { useQuery } from "@tanstack/react-query"
import { useMedusa } from "../../../contexts"
import { UseQueryOptionsWrapper } from "../../../types"
import { queryKeysFactory } from "../../utils/index"

const ADMIN_COLLECTIONS_QUERY_KEY = `admin_shippingProfiles` as const

export const adminShippingProfileKeys = queryKeysFactory(
  ADMIN_COLLECTIONS_QUERY_KEY
)

type ShippingProfileQueryKeys = typeof adminShippingProfileKeys

export const useAdminShippingProfiles = (
  options?: UseQueryOptionsWrapper<
    Response<AdminShippingProfilesListRes>,
    Error,
    ReturnType<ShippingProfileQueryKeys["lists"]>
  >
) => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    adminShippingProfileKeys.lists(),
    // @ts-ignore
    () => client.admin.shippingProfiles.list(),
    options
  )
  return { ...data, ...rest } as const
}

export const useAdminShippingProfile = (
  id: string,
  options?: UseQueryOptionsWrapper<
    Response<AdminShippingProfilesRes>,
    Error,
    ReturnType<ShippingProfileQueryKeys["detail"]>
  >
) => {
  const { client } = useMedusa()
  const { data, ...rest } = useQuery(
    adminShippingProfileKeys.detail(id),
    // @ts-ignore
    () => client.admin.shippingProfiles.retrieve(id),
    options
  )
  return { ...data, ...rest } as const
}
