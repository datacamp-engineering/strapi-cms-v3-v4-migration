require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/16-business_demo_pages_components");

async function f() {
  await migrateTables();

  process.exit();
}

f();
