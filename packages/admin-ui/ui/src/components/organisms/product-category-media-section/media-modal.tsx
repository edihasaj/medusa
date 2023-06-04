import {ProductCategory, ProductCollection} from "@applifyer/medusa"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import useNotification from "../../../hooks/use-notification"
import { FormImage } from "../../../types/shared"
import { prepareImages } from "../../../utils/images"
import { nestedForm } from "../../../utils/nested-form"
import MediaForm, { MediaFormType } from "../../forms/product/media-form"
import Button from "../../fundamentals/button"
import Modal from "../../molecules/modal"
import useEditProductCollectionActions from "../../../hooks/use-edit-product-collection-actions"
import useEditProductCategoryActions from "../../../hooks/use-edit-product-category-actions";

type Props = {
  category: ProductCategory
  open: boolean
  onClose: () => void
}

type MediaFormWrapper = {
  media: MediaFormType
}

const MediaModal = ({ category, open, onClose }: Props) => {
  const { onUpdate, updating } = useEditProductCategoryActions(
      category.id
  )
  const form = useForm<MediaFormWrapper>({
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
      preppedImages = await prepareImages(data.media.images)
    } catch (error) {
      let errorMessage = "Something went wrong while trying to upload images."
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
    const urls = preppedImages.map((image) => image.url)

    onUpdate(
      {
        images: urls,
      },
      onReset
    )
  })

  return (
    <Modal open={open} handleClose={onReset} isLargeModal>
      <Modal.Body>
        <Modal.Header handleClose={onReset}>
          <h1 className="inter-xlarge-semibold m-0">Edit Media</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <div>
              <h2 className="inter-large-semibold mb-2xsmall">Media</h2>
              <p className="inter-base-regular text-grey-50 mb-large">
                Add images to your product category.
              </p>
              <div>
                <MediaForm form={nestedForm(form, "media")} />
              </div>
            </div>
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
): MediaFormWrapper => {
  return {
    media: {
      images:
        ("images" in category &&
            category.images?.map((image) => ({
            url: image.url,
            selected: false,
          }))) ||
        [],
    },
  }
}

export default MediaModal
