const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["workspaces_index_page_components"];

async function migrateTables() {
  await migrate(
    "workspaces_index_page_components",
    "workspaces_index_page_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.workspaces_index_page_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["workspaces_index_page_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
