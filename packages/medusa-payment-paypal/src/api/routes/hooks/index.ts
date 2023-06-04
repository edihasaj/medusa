import { Router } from "express"
import bodyParser from "body-parser"
import { wrapHandler } from "@applifyer/medusa"
import paypalWebhookHandler from "./paypal"

const route = Router()

export default (app) => {
  app.use("/paypal/hooks", route)

  route.use(bodyParser.json())
  route.post("/", wrapHandler(paypalWebhookHandler))

  return app
}
