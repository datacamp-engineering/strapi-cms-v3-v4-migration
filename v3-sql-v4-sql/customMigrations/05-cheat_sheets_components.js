const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["cheat_sheets_components"];

async function migrateTables() {
  await migrate("cheat_sheets_components", "cheat_sheets_components", (item) =>
    omit(
      {
        ...item,
        entity_id: item.cheat_sheet_id,
        component_type: normalizeComponentType(item.component_type),
      },
      ["cheat_sheet_id"]
    )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
