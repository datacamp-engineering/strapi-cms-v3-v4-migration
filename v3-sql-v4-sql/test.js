require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/10-cheat_sheets__sub_categories");

async function f() {
  await migrateTables();

  process.exit();
}

f();
