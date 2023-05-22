import { Router } from "express"
import { PaginatedResponse } from "../../../../types/common"
import middlewares, { transformStoreQuery } from "../../../middlewares"
import "reflect-metadata"
import { StoreGetProductTypesParams } from "./list-product-types"
import { ProductType } from "../../../../models"

const route = Router()

export default (app) => {
  app.use("/product-types", route)

  route.get(
    "/",
    transformStoreQuery(StoreGetProductTypesParams, {
      defaultFields: defaultStoreProductTypeFields,
      defaultRelations: defaultStoreProductTypeRelations,
      allowedFields: allowedStoreProductTypeFields,
      isList: true,
    }),
    middlewares.wrap(require("./list-product-types").default)
  )
  route.get("/:id", middlewares.wrap(require("./get-product-type").default))

  return app
}

export const allowedStoreProductTypeFields = [
  "id",
  "value",
  "thumbnail",
  "metadata",
  "created_at",
  "updated_at",
]

export const defaultStoreProductTypeFields = [
  "id",
  "value",
  "thumbnail",
  "metadata",
  "created_at",
  "updated_at",
]

export const defaultStoreProductTypeRelations = []
export const includeStoreProductTypeRelations = ["images"]

/**
 * @schema StoreProductTypesListRes
 * type: object
 * required:
 *   - product_types
 *   - count
 *   - offset
 *   - limit
 * properties:
 *   product_types:
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ProductType"
 *   count:
 *     type: integer
 *     description: The total number of items available
 *   offset:
 *     type: integer
 *     description: The number of items skipped before these items
 *   limit:
 *     type: integer
 *     description: The number of items per page
 */
export type StoreProductTypesListRes = PaginatedResponse & {
  product_types: ProductType[]
}

export type StoreProductTypesRes = {
  product_type: ProductType
}

export * from "./get-product-type"
export * from "./list-product-types"
