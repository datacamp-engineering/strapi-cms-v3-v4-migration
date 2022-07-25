const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = ["tutorials_components"];

async function migrateTables() {
  await migrate("tutorials_components", "tutorials_components", (item) =>
    omit(
      {
        ...item,
        entity_id: item.tutorial_id,
        component_type: normalizeComponentType(item.component_type),
      },
      ["tutorial_id"]
    )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
