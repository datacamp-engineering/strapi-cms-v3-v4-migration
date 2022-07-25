require("dotenv").config();

const { migrateTables } = require("./customMigrations/19-user-stories");

async function f() {
  await migrateTables();

  process.exit();
}

f();
