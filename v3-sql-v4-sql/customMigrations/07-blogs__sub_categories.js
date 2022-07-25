const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["blogs__sub_categories"];

async function migrateTables() {
  await migrate("blogs__sub_categories", "blogs_sub_categories_links", (item) =>
    omit(item, ["id"])
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
