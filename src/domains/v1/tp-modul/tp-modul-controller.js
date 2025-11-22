import BaseError from "../../../base-classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import TPModulService from "./tp-modul-service.js";

class TPModulController {
  async getAll(req, res) {
    const result = await TPModulService.getAll(req.validatedQuery || {});
    return successResponse(
      res,
      result.data,
      "Moduls retrieved successfully",
      result.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;
    const data = await TPModulService.getById(id);
    return successResponse(res, data, "Modul retrieved successfully");
  }

  async create(req, res) {
    if (!req.body) throw BaseError.badRequest("Request body is missing");
    if (!req.file) throw BaseError.badRequest("File is missing");
    const data = await TPModulService.create(req.body, req.user, req.file);
    return createdResponse(res, data, "Modul created successfully");
  }

  async update(req, res) {
    const { id } = req.params;
    if (!req.body) throw BaseError.badRequest("Request body is missing");
    const data = await TPModulService.update(id, req.body, req.user, req.file);
    return successResponse(res, data, "Modul updated successfully");
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await TPModulService.delete(id, req.user);
    return successResponse(res, data.data, data.message);
  }
}

export default new TPModulController();
