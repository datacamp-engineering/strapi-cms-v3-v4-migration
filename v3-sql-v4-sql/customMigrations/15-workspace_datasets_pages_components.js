const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const { dbV4 } = require("../config/database");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["workspace_datasets_pages_components"];

async function migrateTables() {
  await migrate(
    "workspace_datasets_pages_components",
    "workspace_datasets_pages_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.workspace_datasets_page_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["workspace_datasets_page_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
