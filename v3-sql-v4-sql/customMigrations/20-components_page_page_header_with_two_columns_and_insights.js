const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = [
  "components_page_page_header_with_two_columns_and_insights",
  "components_page_page_header_with_two_columns_and_insights_compo",
];

async function migrateTables() {
  await migrate(
    "components_page_page_header_with_two_columns_and_insights",
    "components_page_page_header_with_columns"
  );

  await migrate(
    "components_page_page_header_with_two_columns_and_insights_compo",
    "components_page_page_header_with_columns_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id:
            item.components_page_page_header_with_two_columns_and_insight_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["components_page_page_header_with_two_columns_and_insight_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
