const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["blog_index_pages_components"];

async function migrateTables() {
  await migrate(
    "blog_index_pages_components",
    "blog_index_pages_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.blog_index_page_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["blog_index_page_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
