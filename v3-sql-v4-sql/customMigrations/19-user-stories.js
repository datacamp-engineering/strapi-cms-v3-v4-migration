const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");

const processedTables = [
  "components_page_userStoriesV2",
  "components_page_userStoriesV2_components",
  "components_page_userStoriesV1",
  "components_page_userStoriesV1_components",
];

async function migrateTables() {
  await migrate(
    "components_page_userStoriesV1",
    "components_page_userstoriesv1"
  );

  await migrate(
    "components_page_userStoriesV2",
    "components_page_userstoriesv2"
  );

  await migrate(
    "components_page_userStoriesV1_components",
    "components_page_userstoriesv1_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.components_page_userStoriesV1_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["components_page_userStoriesV1_id"]
      )
  );

  await migrate(
    "components_page_userStoriesV2_components",
    "components_page_userstoriesv2_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.components_page_userStoriesV2_id,
          component_type: normalizeComponentType(item.component_type),
        },
        ["components_page_userStoriesV2_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
