import BaseRoutes from "../../../base-classes/base-routes.js";
import authMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import CategoryController from "./category-controller.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category-schema.js";

class CourseRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [tryCatch(CategoryController.getAll)]);

    this.router.get("/:id", [tryCatch(CategoryController.getById)]);

    this.router.post("/", [
      authMiddleware.authenticate,
      authMiddleware.authorizeRoles(["ADMIN"]),
      validateCredentials(createCategorySchema),
      tryCatch(CategoryController.create),
    ]);

    this.router.patch("/:id", [
      authMiddleware.authenticate,
      authMiddleware.authorizeRoles(["ADMIN"]),
      validateCredentials(updateCategorySchema),
      tryCatch(CategoryController.update),
    ]);

    this.router.delete("/:id", [
      authMiddleware.authenticate,
      authMiddleware.authorizeRoles(["ADMIN"]),
      tryCatch(CategoryController.delete),
    ]);
  }
}

export default new CourseRoutes().router;
