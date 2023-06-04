import { useEffect, useState } from "react"

import { ProductCategory } from "@applifyer/medusa"
import {useAdminProductCategory, useAdminUpdateProductCategory} from "@applifyer/medusa-react"

import Button from "../../../components/fundamentals/button"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import InputField from "../../../components/molecules/input"
import TextArea from "../../../components/molecules/textarea"
import SideModal from "../../../components/molecules/modal/side-modal"
import { NextSelect } from "../../../components/molecules/select/next-select"
import useNotification from "../../../hooks/use-notification"
import { Option } from "../../../types/shared"
import { getErrorMessage } from "../../../utils/error-messages"
import TreeCrumbs from "../components/tree-crumbs"
import ProductCollectionThumbnailSection from "../../../components/organisms/product-collection-thumbnail-section";
import ProductCollectionMediaSection from "../../../components/organisms/product-collection-media-section";
import ProductCategoryThumbnailSection from "../../../components/organisms/product-category-thumbnail-section";
import ProductCategoryMediaSection from "../../../components/organisms/product-category-media-section";

const visibilityOptions: Option[] = [
  {
    label: "Public",
    value: "public",
  },
  { label: "Private", value: "private" },
]

const statusOptions: Option[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
]

type EditProductCategoriesSideModalProps = {
  activeCategory: ProductCategory
  close: () => void
  isVisible: boolean
  categories?: ProductCategory[]
}

/**
 * Modal for editing product categories
 */
function EditProductCategoriesSideModal(
  props: EditProductCategoriesSideModalProps
) {
  const { isVisible, close, activeCategory, categories } = props

  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isPublic, setIsPublic] = useState(true)

  const notification = useNotification()

  const { mutateAsync: updateCategory } = useAdminUpdateProductCategory(
    activeCategory?.id
  )

  useEffect(() => {
    if (activeCategory) {
      setName(activeCategory.name)
      setHandle(activeCategory.handle)
      setDescription(activeCategory.description)
      setIsActive(activeCategory.is_active.valueOf())
      setIsPublic(!activeCategory.is_internal)
    }
  }, [activeCategory])

  const onSave = async () => {
    try {
      await updateCategory({
        name,
        handle,
        description,
        is_active: isActive,
        is_internal: !isPublic,
      })

      notification("Success", "Successfully updated the category", "success")
      close()
    } catch (e) {
      const errorMessage = getErrorMessage(e) || "Failed to update the category"
      notification("Error", errorMessage, "error")
    }
  }

  return (
    <SideModal close={close} isVisible={!!isVisible}>
      <div className="flex h-full flex-col justify-between">
        {/* === HEADER === */}
        <div className="flex items-center justify-between p-6">
          <h3 className="inter-large-semibold flex items-center gap-2 text-xl text-gray-900">
            Edit product category
          </h3>
          <Button
            variant="secondary"
            className="h-8 w-8 p-2"
            onClick={props.close}
          >
            <CrossIcon size={20} className="text-grey-50" />
          </Button>
        </div>

        {/* === DIVIDER === */}
        <div className="block h-[1px] bg-gray-200" />

        {activeCategory && categories && (
          <div className="mt-[25px] px-6">
            <TreeCrumbs nodes={categories} currentNode={activeCategory} />
          </div>
        )}

        <div className="flex-grow px-6">
          <InputField
            required
            label="Name"
            type="string"
            name="name"
            value={name}
            className="my-6"
            placeholder="Give this category a name"
            onChange={(ev) => setName(ev.target.value)}
          />

          <InputField
            required
            label="Handle"
            type="string"
            name="handle"
            value={handle}
            className="my-6"
            placeholder="Custom handle"
            onChange={(ev) => setHandle(ev.target.value)}
          />

          <TextArea
            label="Description"
            name="description"
            value={description}
            className="my-6"
            placeholder="Give this category a description"
            onChange={(ev) => setDescription(ev.target.value)}
          />

          <NextSelect
            label="Status"
            className="mb-6"
            options={statusOptions}
            value={statusOptions[isActive ? 0 : 1]}
            onChange={(o) => setIsActive(o.value === "active")}
          />

          <NextSelect
            className="mb-2"
            label="Visibility"
            options={visibilityOptions}
            value={visibilityOptions[isPublic ? 0 : 1]}
            onChange={(o) => setIsPublic(o.value === "public")}
          />

          {/* === DIVIDER === */}
          <div className="block my-4 h-[1px] bg-gray-200" />

          {activeCategory && (
              <div className="gap-y-xsmall col-span-4 flex flex-col">
                <ProductCategoryThumbnailSection
                    category={activeCategory}
                />
                <ProductCategoryMediaSection category={activeCategory} />
              </div>
          )}
        </div>

        {/* === DIVIDER === */}
        <div className="block h-[1px] bg-gray-200" />

        {/* === FOOTER === */}
        <div className="flex justify-end gap-2 p-3 my-5">
          <Button size="small" variant="ghost" onClick={close}>
            Cancel
          </Button>
          <Button size="small" variant="primary" onClick={onSave}>
            Save and close
          </Button>
        </div>
      </div>
    </SideModal>
  )
}

export default EditProductCategoriesSideModal
