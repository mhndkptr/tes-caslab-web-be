const courseQueryConfig = {
  searchableFields: ["title", "description", "code"],
  filterableFields: [],
  relations: {
    tp_moduls: {
      include: {
        category: true,
      },
    },
  },
  hasSoftDelete: true,
  omit: {},
};

export default courseQueryConfig;
