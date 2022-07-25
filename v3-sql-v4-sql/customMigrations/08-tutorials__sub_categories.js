const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["tutorials__sub_categories"];

async function migrateTables() {
  await migrate(
    "tutorials__sub_categories",
    "tutorials_sub_categories_links",
    (item) => omit(item, ["id"])
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
