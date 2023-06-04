import {
  AdminPostReservationsReq,
  AdminPostReservationsReservationReq,
  AdminReservationsDeleteRes,
  AdminReservationsRes,
} from "@applifyer/medusa"
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { Response } from "@applifyer/medusa-js"
import { adminInventoryItemsKeys } from "../inventory-item"
import { adminReservationsKeys } from "./queries"
import { adminVariantKeys } from "../variants"
import { buildOptions } from "../../utils/buildOptions"
import { useMedusa } from "../../../contexts"

export const useAdminCreateReservation = (
  options?: UseMutationOptions<
    Response<AdminReservationsRes>,
    Error,
    AdminPostReservationsReq
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    (payload: AdminPostReservationsReq) =>
      client.admin.reservations.create(payload),
    buildOptions(
      queryClient,
      [adminReservationsKeys.lists(), adminVariantKeys.all],
      options
    )
  )
}

export const useAdminUpdateReservation = (
  id: string,
  options?: UseMutationOptions<
    Response<AdminReservationsRes>,
    Error,
    AdminPostReservationsReservationReq
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    (payload: AdminPostReservationsReservationReq) =>
      client.admin.reservations.update(id, payload),
    buildOptions(
      queryClient,
      [
        adminReservationsKeys.lists(),
        adminReservationsKeys.detail(id),
        adminVariantKeys.all,
        adminInventoryItemsKeys.details()
      ],
      options
    )
  )
}

export const useAdminDeleteReservation = (
  id: string,
  options?: UseMutationOptions<
    Response<AdminReservationsDeleteRes>,
    Error,
    void
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    () => client.admin.reservations.delete(id),
    buildOptions(
      queryClient,
      [
        adminReservationsKeys.lists(),
        adminReservationsKeys.detail(id),
        adminVariantKeys.all,
      ],
      options
    )
  )
}
