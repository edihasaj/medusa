import {ProductCategory, ProductCollection} from "@applifyer/medusa"
import clsx from "clsx"
import useNotification from "../../../hooks/use-notification"
import useToggleState from "../../../hooks/use-toggle-state"
import { getErrorMessage } from "../../../utils/error-messages"
import TwoStepDelete from "../../atoms/two-step-delete"
import Button from "../../fundamentals/button"
import Section from "../../organisms/section"
import ThumbnailModal from "./thumbnail-modal"
import useEditProductCollectionActions from "../../../hooks/use-edit-product-collection-actions"
import useEditProductCategoryActions from "../../../hooks/use-edit-product-category-actions";

type Props = {
    category: ProductCategory
}

const ProductCategoryThumbnailSection = ({ category }: Props) => {
    const { onUpdate, updating } = useEditProductCategoryActions(
        category.id
    )
    const { state, toggle, close } = useToggleState()
    const notification = useNotification()

    const handleDelete = () => {
        onUpdate(
            {
                // @ts-ignore
                thumbnail: null,
            },
            {
                onSuccess: () => {
                    notification("Success", "Successfully deleted thumbnail", "success")
                },
                onError: (err: any) => {
                    notification("Error", getErrorMessage(err), "error")
                },
            }
        )
    }

    return (
        <>
            <Section
                title="Thumbnail"
                customActions={
                    <div className="gap-x-xsmall flex items-center">
                        <Button
                            variant="secondary"
                            size="small"
                            type="button"
                            onClick={toggle}
                        >
                            {category.thumbnail ? "Edit" : "Upload"}
                        </Button>
                        {category.thumbnail && (
                            <TwoStepDelete onDelete={handleDelete} deleting={updating} />
                        )}
                    </div>
                }
            >
                <div
                    className={clsx("gap-xsmall mt-base grid grid-cols-3", {
                        hidden: !category.thumbnail,
                    })}
                >
                    {category.thumbnail && (
                        <div className="flex aspect-square items-center justify-center">
                            <img
                                src={category.thumbnail}
                                alt={`Thumbnail for ${category.name}`}
                                className="rounded-rounded max-h-full max-w-full object-contain"
                            />
                        </div>
                    )}
                </div>
            </Section>

            <ThumbnailModal
                category={category}
                open={state}
                onClose={close}
            />
        </>
    )
}

export default ProductCategoryThumbnailSection
