const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["podcasts__sub_category"];

async function migrateTables() {
  await migrate(
    "podcasts__sub_category",
    "podcasts_sub_category_links",
    (item) => omit(item, ["id"])
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
