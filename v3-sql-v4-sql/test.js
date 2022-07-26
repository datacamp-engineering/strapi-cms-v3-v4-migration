require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/25-components_page_blog_post_cards_components");

async function f() {
  await migrateTables();

  process.exit();
}

f();
