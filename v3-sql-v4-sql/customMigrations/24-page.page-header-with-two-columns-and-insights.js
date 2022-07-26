const { dbV4 } = require("../config/database");

const processedTables = [];

async function migrateTables() {
  await dbV4.raw(
    "update files_related_morphs set related_type = 'page.page-header-with-columns' where related_type = 'page.page-header-with-two-columns-and-insights'"
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
