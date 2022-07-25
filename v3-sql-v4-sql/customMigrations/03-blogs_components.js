const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["blogs_components"];

async function migrateTables() {
  await migrate("blogs_components", "blogs_components", (item) =>
    omit(
      {
        ...item,
        entity_id: item.blog_id,
        component_type: normalizeComponentType(item.component_type),
      },
      ["blog_id"]
    )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
