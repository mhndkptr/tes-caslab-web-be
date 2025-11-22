import Joi from "joi";

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(150).required(),
}).messages({
  "any.required": "All required fields must be provided.",
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(150).optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

const getAllCategoryParamsSchema = Joi.object({
  get_all: Joi.boolean().optional().default(false),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }).optional(),

  order_by: Joi.array()
    .items(
      Joi.object({
        field: Joi.string()
          .valid("name", "created_at", "updated_at")
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

export {
  createCategorySchema,
  updateCategorySchema,
  getAllCategoryParamsSchema,
};
