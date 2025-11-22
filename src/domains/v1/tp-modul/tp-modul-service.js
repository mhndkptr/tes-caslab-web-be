import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import { CloudinaryService } from "../../../common/services/cloudinary-service.js";
import tpModulQueryConfig from "./tp-modul-query-config.js";

class TPModulService {
  constructor() {
    this.prisma = new PrismaService();
    this.cloudinary = new CloudinaryService();
  }

  async getAll(query = {}) {
    const options = buildQueryOptions(tpModulQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.tpModul.findMany(options),
      this.prisma.tpModul.count({ where: options.where }),
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
    const data = await this.prisma.tpModul.findFirst({
      where: { id },
      include: {
        category: true,
        course: true,
      },
    });

    if (!data) throw BaseError.notFound("Modul not found.");
    return data;
  }

  async create(value, user, file) {
    if (file) {
      const uploadResult = await this.cloudinary.uploadFromBufferToCloudinary(
        file.buffer,
        "tp-modul"
      );
      if (uploadResult) {
        value.modul_uri = uploadResult.secure_url;
      }
    }

    return await this.prisma.tpModul.create({ data: value });
  }

  async update(id, value, user, file) {
    const exist = await this.prisma.tpModul.findFirst({ where: { id } });
    if (!exist) throw BaseError.notFound("Modul not found.");

    if (file) {
      if (exist.modul_uri != null) {
        await this.cloudinary.deleteFromUrlsCloudinary([exist.modul_uri]);
      }

      const uploadResult = await this.cloudinary.uploadFromBufferToCloudinary(
        file.buffer,
        "tp-modul"
      );

      if (uploadResult) {
        value.modul_uri = uploadResult.secure_url;
      }
    }

    return await this.prisma.tpModul.update({ where: { id }, data: value });
  }

  async delete(id, user) {
    const exist = await this.prisma.tpModul.findFirst({ where: { id } });
    if (!exist) throw BaseError.notFound("Modul not found.");

    if (exist.modul_uri != null) {
      await this.cloudinary.deleteFromUrlsCloudinary([exist.modul_uri]);
    }

    const deleted = await this.prisma.tpModul.delete({ where: { id } });
    return { data: deleted, message: "Modul permanently deleted." };
  }
}

export default new TPModulService();
