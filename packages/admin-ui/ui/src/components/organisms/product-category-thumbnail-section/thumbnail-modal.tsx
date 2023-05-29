import {ProductCategory, ProductCollection} from "@medusajs/medusa"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import useNotification from "../../../hooks/use-notification"
import { FormImage } from "../../../types/shared"
import { prepareImages } from "../../../utils/images"
import { nestedForm } from "../../../utils/nested-form"
import ThumbnailForm, {
  ThumbnailFormType,
} from "../../forms/product/thumbnail-form"
import Button from "../../fundamentals/button"
import Modal from "../../molecules/modal"
import useEditProductCollectionActions from "../../../hooks/use-edit-product-collection-actions"

type Props = {
  category: ProductCategory
  open: boolean
  onClose: () => void
}

type ThumbnailFormWrapper = {
  thumbnail: ThumbnailFormType
}

const ThumbnailModal = ({ category, open, onClose }: Props) => {
  const { onUpdate, updating } = useEditProductCollectionActions(
      category.id
  )
  const form = useForm<ThumbnailFormWrapper>({
    defaultValues: getDefaultValues(category),
  })

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form

  const notification = useNotification()

  useEffect(() => {
    reset(getDefaultValues(category))
  }, [category, reset])

  const onReset = () => {
    reset(getDefaultValues(category))
    onClose()
  }

  const onSubmit = handleSubmit(async (data) => {
    let preppedImages: FormImage[] = []

    try {
      preppedImages = await prepareImages(data.thumbnail.images)
    } catch (error) {
      let errorMessage =
          "Something went wrong while trying to upload the thumbnail."
      const response = (error as any).response as Response

      if (response.status === 500) {
        errorMessage =
            errorMessage +
            " " +
            "You might not have a file service configured. Please contact your administrator"
      }

      notification("Error", errorMessage, "error")
      return
    }
    const url = preppedImages?.[0]?.url

    onUpdate(
        {
          // @ts-ignore
          thumbnail: url || null,
        },
        onReset
    )
  })

  return (
      <Modal open={open} handleClose={onReset} isLargeModal>
        <Modal.Body>
          <Modal.Header handleClose={onReset}>
            <h1 className="inter-xlarge-semibold m-0">Upload Thumbnail</h1>
          </Modal.Header>
          <form onSubmit={onSubmit}>
            <Modal.Content>
              <h2 className="inter-large-semibold mb-2xsmall">Thumbnail</h2>
              <p className="inter-base-regular text-grey-50 mb-large">
                Used to represent your product during checkout, social sharing and
                more.
              </p>
              <ThumbnailForm form={nestedForm(form, "thumbnail")} />
            </Modal.Content>
            <Modal.Footer>
              <div className="flex w-full justify-end gap-x-2">
                <Button
                    size="small"
                    variant="secondary"
                    type="button"
                    onClick={onReset}
                >
                  Cancel
                </Button>
                <Button
                    size="small"
                    variant="primary"
                    type="submit"
                    disabled={!isDirty}
                    loading={updating}
                >
                  Save and close
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
  )
}

const getDefaultValues = (
    category: ProductCategory
): ThumbnailFormWrapper => {
  return {
    thumbnail: {
      images: category.thumbnail
          ? [
            {
              url: category.thumbnail,
            },
          ]
          : [],
    },
  }
}

export default ThumbnailModal
