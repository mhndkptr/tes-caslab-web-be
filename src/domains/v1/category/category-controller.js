import BaseError from "../../../base-classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import CategoryService from "./category-service.js";

class CategoryController {
  async getAll(req, res) {
    const result = await CategoryService.getAll(req.validatedQuery || {});
    return successResponse(
      res,
      result.data,
      "Categorys retrieved successfully",
      result.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;
    const data = await CategoryService.getById(id);
    return successResponse(res, data, "Category retrieved successfully");
  }

  async create(req, res) {
    if (!req.body) throw BaseError.badRequest("Request body is missing");
    const data = await CategoryService.create(req.body, req.user, req.file);
    return createdResponse(res, data, "Category created successfully");
  }

  async update(req, res) {
    const { id } = req.params;
    if (!req.body) throw BaseError.badRequest("Request body is missing");
    const data = await CategoryService.update(id, req.body, req.user, req.file);
    return successResponse(res, data, "Category updated successfully");
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await CategoryService.delete(id, req.user);
    return successResponse(res, data.data, data.message);
  }
}

export default new CategoryController();
