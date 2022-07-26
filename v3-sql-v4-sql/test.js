require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/24-page.page-header-with-two-columns-and-insights");

async function f() {
  await migrateTables();

  process.exit();
}

f();
