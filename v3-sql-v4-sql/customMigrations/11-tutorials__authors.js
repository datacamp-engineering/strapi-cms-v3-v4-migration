const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["tutorials__authors"];

async function migrateTables() {
  await migrate("tutorials__authors", "tutorials_authors_links", (item) =>
    omit(item, ["id"])
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
