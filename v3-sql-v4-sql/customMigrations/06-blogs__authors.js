const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["blogs__authors"];

async function migrateTables() {
  await migrate("blogs__authors", "blogs_authors_links", (item) =>
    omit(item, ["id"])
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
