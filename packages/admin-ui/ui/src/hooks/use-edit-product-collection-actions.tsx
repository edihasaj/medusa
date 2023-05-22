import {
  useAdminDeleteProduct,
  useAdminProduct,
  useAdminUpdateCollection,
} from "medusa-react"

import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../utils/error-messages"
import useImperativeDialog from "./use-imperative-dialog"
import useNotification from "./use-notification"
import { AdminPostCollectionsCollectionReq } from "@medusajs/medusa"

const useEditProductActions = (collectionId: string) => {
  const dialog = useImperativeDialog()
  const navigate = useNavigate()
  const notification = useNotification()
  const getProduct = useAdminProduct(collectionId)
  const { mutate: update, isLoading: updating } =
    useAdminUpdateCollection(collectionId)
  const deleteProduct = useAdminDeleteProduct(collectionId)

  const onDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Delete Product collection",
      text: "Are you sure you want to delete this product collection",
    })
    if (shouldDelete) {
      deleteProduct.mutate(undefined, {
        onSuccess: () => {
          notification("Success", "Product deleted successfully", "success")
          navigate("/a/products/")
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
    successMessage = "Product collection was successfully updated"
  ) => {
    update.mutate(
      // @ts-ignore TODO fix images being required
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
    getProduct,
    onDelete,
    onUpdate,
    updating: updating,
    deleting: deleteProduct.isLoading,
  }
}

export default useEditProductActions
