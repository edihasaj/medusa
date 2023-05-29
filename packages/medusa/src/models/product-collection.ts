import {BeforeInsert, Column, Entity, Index, JoinTable, ManyToMany, OneToMany} from "typeorm"

import { DbAwareColumn } from "../utils/db-aware-column"
import { Product } from "./product"
import { SoftDeletableEntity } from "../interfaces/models/soft-deletable-entity"
import _ from "lodash"
import { generateEntityId } from "../utils/generate-entity-id"
import {Image} from "./image";

@Entity()
export class ProductCollection extends SoftDeletableEntity {
  @Column()
  title: string

  @Index({ unique: true, where: "deleted_at IS NULL" })
  @Column({ nullable: true })
  handle: string

  @Column({ type: "text", nullable: true })
  description: string | null

  @OneToMany(() => Product, (product) => product.collection)
  products: Product[]

  @ManyToMany(() => Image, { cascade: ["insert"] })
  @JoinTable({
    name: "product_collection_images",
    joinColumn: {
      name: "product_collection_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "image_id",
      referencedColumnName: "id",
    },
  })
  images: Image[]

  @Column({ nullable: true })
  thumbnail: string

  @DbAwareColumn({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>

  @Column({type: 'varchar', nullable: true })
  type?: string

  @BeforeInsert()
  private createHandleIfNotProvided(): void {
    if (this.id) return

    this.id = generateEntityId(this.id, "pcol")
    if (!this.handle) {
      this.handle = _.kebabCase(this.title)
    }
  }
}

/**
 * @schema ProductCollection
 * title: "Product Collection"
 * description: "Product Collections represents a group of Products that are related."
 * type: object
 * required:
 *   - created_at
 *   - deleted_at
 *   - handle
 *   - id
 *   - metadata
 *   - title
 *   - updated_at
 * properties:
 *   id:
 *     description: The product collection's ID
 *     type: string
 *     example: pcol_01F0YESBFAZ0DV6V831JXWH0BG
 *   title:
 *     description: The title that the Product Collection is identified by.
 *     type: string
 *     example: Summer Collection
 *   handle:
 *     description: A unique string that identifies the Product Collection - can for example be used in slug structures.
 *     nullable: true
 *     type: string
 *     example: summer-collection
 *   products:
 *     description: The Products contained in the Product Collection. Available if the relation `products` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Product"
 *   created_at:
 *     description: The date with timezone at which the resource was created.
 *     type: string
 *     format: date-time
 *   updated_at:
 *     description: The date with timezone at which the resource was updated.
 *     type: string
 *     format: date-time
 *   deleted_at:
 *     description: The date with timezone at which the resource was deleted.
 *     nullable: true
 *     type: string
 *     format: date-time
 *   metadata:
 *     description: An optional key-value map with additional details
 *     nullable: true
 *     type: object
 *     example: {car: "white"}
 *   description:
 *     description: "A short description of the Product Collection."
 *     type: string
 *     example: Every programmer's best friend.
 *   images:
 *     description: "Images of the Product Collection"
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Image"
 *   thumbnail:
 *     description: "A URL to an image file that can be used to identify the Product Collection."
 *     type: string
 */
