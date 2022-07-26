const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
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
          component_type: normalizeComponentType(item.component_type).replace(
            "header-with-two-columns-and-insight",
            "header-with-columns"
          ),
          field: item.field.replace(
            "pageHeaderWithTwoColumnsAndInsights",
            "pageHeaderWithColumns"
          ),
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
