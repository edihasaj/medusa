import {
  useAdminDeleteProduct, useAdminDeleteProductCategory,
  useAdminProduct,
  useAdminUpdateCollection, useAdminUpdateProductCategory,
} from "@applifyer/medusa-react"

import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../utils/error-messages"
import useImperativeDialog from "./use-imperative-dialog"
import useNotification from "./use-notification"
import { AdminPostCollectionsCollectionReq } from "@medusajs/medusa"

const useEditProductCategoryActions = (collectionId: string) => {
  const dialog = useImperativeDialog()
  const navigate = useNavigate()
  const notification = useNotification()
  const { mutate: update, isLoading: updating } =
    useAdminUpdateProductCategory(collectionId)
  const deleteProductCategory = useAdminDeleteProductCategory(collectionId)

  const onDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Delete Product category",
      text: "Are you sure you want to delete this product category",
    })
    if (shouldDelete) {
      deleteProductCategory.mutate(undefined, {
        onSuccess: () => {
          notification("Success", "Product category deleted successfully", "success")
          navigate("/a/products?view=collections")
        },
        onError: (err) => {
          notification("Error", getErrorMessage(err), "error")
        },
      })
    }
  }

  const onUpdate = (
    payload: Partial<AdminPostCollectionsCollectionReq>,
    onSuccess: () => void,
    successMessage = "Product category was successfully updated"
  ) => {
    update(
      payload,
      {
        onSuccess: () => {
          notification("Success", successMessage, "success")
          onSuccess()
        },
        onError: (err) => {
          notification("Error", getErrorMessage(err), "error")
        },
      }
    )
  }

  return {
    onDelete,
    onUpdate,
    updating: updating,
    deleting: deleteProductCategory.isLoading,
  }
}

export default useEditProductCategoryActions
