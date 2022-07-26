const { dbV4 } = require("../config/database");

const processedTables = [];

async function migrateTables() {
  await dbV4
    .raw(
      "insert into admin_users (id, username, blocked, email) values (8, 'migration-fix', true, 'migration.fix@datacamp.com');"
    )
    .catch(console.log);
}

module.exports = {
  processedTables,
  migrateTables,
};
