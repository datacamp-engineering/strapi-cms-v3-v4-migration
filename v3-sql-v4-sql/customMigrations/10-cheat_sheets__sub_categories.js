const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["cheat_sheets__sub_categories"];

async function migrateTables() {
  await migrate(
    "cheat_sheets__sub_categories",
    "cheat_sheets_sub_categories_links",
    (item) => omit(item, ["id"])
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
