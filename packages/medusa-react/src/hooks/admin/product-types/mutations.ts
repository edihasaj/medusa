import {
  AdminProductTypesDeleteRes,
  AdminProductTypesRes,
} from "@applifyer/medusa"
import { Response } from "@applifyer/medusa-js"
// @ts-ignore
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query"
import { adminProductTypeKeys } from "."
import { useMedusa } from "../../../contexts/medusa"
import { buildOptions } from "../../utils/buildOptions"
import {
  CreateProductType,
  UpdateProductType,
} from "@applifyer/medusa/dist/types/product-type"

export const useAdminCreateProductType = (
  options?: UseMutationOptions<
    Response<AdminProductTypesRes>,
    Error,
    CreateProductType
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()
  // @ts-ignore
  return useMutation(
    (payload: CreateProductType) => client.admin.productTypes.create(payload),
    // @ts-ignore
    buildOptions(queryClient, adminProductTypeKeys.lists(), options)
  )
}

export const useAdminUpdateProductType = (
  id: string,
  options?: UseMutationOptions<
    Response<AdminProductTypesRes>,
    Error,
    UpdateProductType
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()
  // @ts-ignore
  return useMutation(
    (payload: UpdateProductType) =>
      client.admin.productTypes.update(id, payload),
    buildOptions(
      // @ts-ignore
      queryClient,
      [adminProductTypeKeys.lists(), adminProductTypeKeys.detail(id)],
      options
    )
  )
}

export const useAdminDeleteProductType = (
  id: string,
  options?: UseMutationOptions<
    Response<AdminProductTypesDeleteRes>,
    Error,
    void
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()
  // @ts-ignore
  return useMutation(
    () => client.admin.productTypes.delete(id),
    buildOptions(
      // @ts-ignore
      queryClient,
      [adminProductTypeKeys.lists(), adminProductTypeKeys.detail(id)],
      options
    )
  )
}
