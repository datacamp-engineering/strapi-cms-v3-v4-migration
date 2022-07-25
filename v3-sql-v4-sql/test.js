require("dotenv").config();

const {
  migrateTables,
} = require("./customMigrations/18-components_blog_trending");

async function f() {
  await migrateTables();

  process.exit();
}

f();
