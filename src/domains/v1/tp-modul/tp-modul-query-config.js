const tpModulQueryConfig = {
  searchableFields: ["title", "description", "subttile"],
  filterableFields: ["status"],
  relations: {
    course: true,
    category: true,
  },
  hasSoftDelete: false,
  omit: {},
};

export default tpModulQueryConfig;
