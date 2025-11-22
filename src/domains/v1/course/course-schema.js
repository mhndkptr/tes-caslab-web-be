import Joi from "joi";

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().allow("", null).optional(),
  content: Joi.string().allow("", null).required(),
  code: Joi.string().alphanum().min(3).max(10).required(),
}).messages({
  "any.required": "All required fields must be provided.",
});

const updateCourseSchema = Joi.object({
  title: Joi.string().min(3).max(150).optional(),
  description: Joi.string().allow("", null).optional(),
  content: Joi.string().allow("", null).optional(),
  code: Joi.string().alphanum().min(3).max(10).optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

const getAllCourseParamsSchema = Joi.object({
  get_all: Joi.boolean().optional().default(false),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }).optional(),

  order_by: Joi.array()
    .items(
      Joi.object({
        field: Joi.string()
          .valid("title", "created_at", "updated_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  include_relation: Joi.array()
    .items(Joi.string().valid("tp_moduls"))
    .optional(),

  search: Joi.string().allow("", null).optional(),

  filter: Joi.object({}).optional(),
});

export { createCourseSchema, updateCourseSchema, getAllCourseParamsSchema };
