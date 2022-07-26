require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/21-components_page_marketo_form_components_components");

async function f() {
  await migrateTables();

  process.exit();
}

f();
