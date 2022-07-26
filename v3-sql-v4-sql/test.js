require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/26-components_page_publication_galleries_components");

async function f() {
  await migrateTables();

  process.exit();
}

f();
