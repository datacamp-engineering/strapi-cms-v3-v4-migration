const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["business_demo_pages_components"];

async function migrateTables() {
  await migrate(
    "business_demo_pages_components",
    "business_demo_pages_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.business_demo_page_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["business_demo_page_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
