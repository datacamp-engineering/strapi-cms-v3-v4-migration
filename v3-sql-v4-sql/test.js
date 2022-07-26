require("dotenv").config();

const { migrateCustom } = require("./migrate/migrateCustom");

async function f() {
  await migrateCustom.migrateTables();

  process.exit();
}

f();
