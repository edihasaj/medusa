import { Connection } from "typeorm"
import { ProductCategory } from "@applifyer/medusa"

export const simpleProductCategoryFactory = async (
  connection: Connection,
  data: Partial<ProductCategory> = {}
): Promise<ProductCategory> => {
  const manager = connection.manager
  const address = manager.create(ProductCategory, data)

  return await manager.save(address)
}
