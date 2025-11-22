import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import categoryQueryConfig from "./category-query-config.js";
import { CloudinaryService } from "../../../common/services/cloudinary-service.js";

class CategoryService {
  constructor() {
    this.prisma = new PrismaService();
    this.cloudinary = new CloudinaryService();
  }

  async getAll(query = {}) {
    const options = buildQueryOptions(categoryQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.category.findMany(options),
      this.prisma.category.count({ where: options.where }),
    ]);

    const page = query?.pagination?.page ?? 1;
    const limit = query?.pagination?.limit ?? 10;
    const totalPages = Math.ceil(count / limit);

    return {
      data,
      meta: {
        totalItems: count,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  async getById(id) {
    const data = await this.prisma.category.findFirst({
      where: { id },
      include: {
        tp_moduls: true,
      },
    });

    if (!data) throw BaseError.notFound("Category not found.");
    return data;
  }

  async create(value, user) {
    return await this.prisma.category.create({ data: value });
  }

  async update(id, value, user, file) {
    const exist = await this.prisma.category.findFirst({ where: { id } });
    if (!exist) throw BaseError.notFound("Category not found.");

    return await this.prisma.category.update({
      where: { id },
      data: value,
    });
  }

  async delete(id, user) {
    const exist = await this.prisma.category.findFirst({ where: { id } });
    if (!exist) throw BaseError.notFound("Category not found.");

    const deleted = await this.prisma.category.delete({ where: { id } });
    return { data: deleted, message: "Category permanently deleted." };
  }
}

export default new CategoryService();
