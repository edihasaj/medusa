import { useAdminDeleteProduct, useAdminUpdateCollection } from "medusa-react"

import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../utils/error-messages"
import useImperativeDialog from "./use-imperative-dialog"
import useNotification from "./use-notification"
import { AdminPostCollectionsCollectionReq } from "@applifyer/medusa"

const useEditProductCollectionActions = (collectionId: string) => {
  const dialog = useImperativeDialog()
  const navigate = useNavigate()
  const notification = useNotification()
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
          notification(
            "Success",
            "Product collection deleted successfully",
            "success"
          )
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
    successMessage = "Product collection was successfully updated"
  ) => {
    update(payload, {
      onSuccess: () => {
        notification("Success", successMessage, "success")
        onSuccess()
      },
      onError: (err) => {
        notification("Error", getErrorMessage(err), "error")
      },
    })
  }

  return {
    onDelete,
    onUpdate,
    updating: updating,
    deleting: deleteProduct.isLoading,
  }
}

export default useEditProductCollectionActions
