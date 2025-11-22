import JoiDate from "@joi/date";
import JoiBase from "joi";

const Joi = JoiBase.extend(JoiDate);

const createTpModulSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  subtitle: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(3).max(150).required(),
  category_id: Joi.string().uuid().required(),
  course_id: Joi.string().uuid().required(),
  deadline: Joi.date().format("YYYY-MM-DD HH:mm:ss").required(),
  status: Joi.string().valid("PUBLISH", "DRAFT").required(),
}).messages({
  "any.required": "All required fields must be provided.",
});

const updateTpModulSchema = Joi.object({
  title: Joi.string().min(3).max(150).optional(),
  subtitle: Joi.string().min(3).max(150).optional(),
  description: Joi.string().min(3).max(150).optional(),
  category_id: Joi.string().uuid().optional(),
  course_id: Joi.string().uuid().optional(),
  deadline: Joi.date().format("YYYY-MM-DD HH:mm:ss").optional(),
  status: Joi.string().valid("PUBLISH", "DRAFT").optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

const getAllTpModulParamsSchema = Joi.object({
  get_all: Joi.boolean().optional().default(false),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }).optional(),

  order_by: Joi.array()
    .items(
      Joi.object({
        field: Joi.string()
          .valid("title", "subtitle", "status", "created_at", "updated_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  include_relation: Joi.array()
    .items(Joi.string().valid("course", "category"))
    .optional(),

  search: Joi.string().allow("", null).optional(),

  filter: Joi.object({
    status: Joi.string().valid("PUBLISH", "DRAFT").optional(),
  }).optional(),
});

export { createTpModulSchema, updateTpModulSchema, getAllTpModulParamsSchema };
