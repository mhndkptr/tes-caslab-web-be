import BaseRoutes from "../../../base-classes/base-routes.js";
import authMiddleware from "../../../middlewares/auth-token-middleware.js";
import uploadFile from "../../../middlewares/upload-file-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateQueryParamsCredentials from "../../../middlewares/validate-query-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import TPModulController from "./tp-modul-controller.js";
import {
  createTpModulSchema,
  updateTpModulSchema,
  getAllTpModulParamsSchema,
} from "./tp-modul-schema.js";

class TPModulRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      validateQueryParamsCredentials(getAllTpModulParamsSchema),
      tryCatch(TPModulController.getAll),
    ]);

    this.router.get("/:id", [tryCatch(TPModulController.getById)]);

    this.router.post("/", [
      authMiddleware.authenticate,
      authMiddleware.authorizeRoles(["ADMIN"]),
      uploadFile("document").single("file_attachment"),
      validateCredentials(createTpModulSchema),
      tryCatch(TPModulController.create),
    ]);

    this.router.patch("/:id", [
      authMiddleware.authenticate,
      authMiddleware.authorizeRoles(["ADMIN"]),
      uploadFile("image").single("image_cover"),
      validateCredentials(updateTpModulSchema),
      tryCatch(TPModulController.update),
    ]);

    this.router.delete("/:id", [
      authMiddleware.authenticate,
      authMiddleware.authorizeRoles(["ADMIN"]),
      tryCatch(TPModulController.delete),
    ]);
  }
}

export default new TPModulRoutes().router;
