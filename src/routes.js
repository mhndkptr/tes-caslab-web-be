import express from "express";
import authRoutes from "./domains/v1/auth/auth-routes.js";
import courseRoutes from "./domains/v1/course/course-routes.js";
import tpModulRoutes from "./domains/v1/tp-modul/tp-modul-routes.js";
import categoryRoutes from "./domains/v1/category/category-routes.js";

const router = express.Router();

const appsV1Routes = [
  { path: "/auth", route: authRoutes },
  { path: "/course", route: courseRoutes },
  { path: "/tp-modul", route: tpModulRoutes },
  { path: "/category", route: categoryRoutes },
];

appsV1Routes.forEach(({ path, route }) => {
  router.use(`/api/v1${path}`, route);
});

export default router;
