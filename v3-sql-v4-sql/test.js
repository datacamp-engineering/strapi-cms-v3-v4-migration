require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/20-components_page_page_header_with_two_columns_and_insights");

async function f() {
  await migrateTables();

  process.exit();
}

f();
