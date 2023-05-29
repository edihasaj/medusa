import {ProductCategory} from "@medusajs/medusa"
import useToggleState from "../../../hooks/use-toggle-state"
import { ActionType } from "../../molecules/actionables"
import Section from "../../organisms/section"
import MediaModal from "./media-modal"

type Props = {
  category: ProductCategory
}

const ProductCategoryMediaSection = ({ category }: Props) => {
  const { state, close, toggle } = useToggleState()

  const actions: ActionType[] = [
    {
      label: "Edit Media",
      onClick: toggle,
    },
  ]

  return (
    <>
      <Section title="Media" actions={actions}>
        {category.images && category.images?.length > 0 && (
          <div className="gap-xsmall mt-base grid grid-cols-3">
            {category.images?.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className="flex aspect-square items-center justify-center"
                >
                  <img
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    className="rounded-rounded max-h-full max-w-full object-contain"
                  />
                </div>
              )
            })}
          </div>
        )}
      </Section>

      <MediaModal
        category={category}
        open={state}
        onClose={close}
      />
    </>
  )
}

export default ProductCategoryMediaSection
