const { dbV4 } = require("../config/database");

const processedTables = [];

async function migrateTables() {
  await dbV4.raw(
    "update files_related_morphs set related_type = 'api::author.author' where field = 'authorAvatar';"
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
