require("dotenv").config();

const { migrateTables } = require("./customMigrations/11-tutorials__authors");

async function f() {
  await migrateTables();

  process.exit();
}

f();
