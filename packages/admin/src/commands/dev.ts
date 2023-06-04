import type { AdminDevConfig } from "@applifyer/admin-ui"
import { dev as devAdmin } from "@applifyer/admin-ui"

export default async function dev(args: AdminDevConfig) {
  await devAdmin(args)
}
