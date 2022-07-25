// Tables that should not be processed later
const processedTables = [];

const fs = require("fs");
const path = require("path");

const customMigrations = [];

const MIGRATION_FOLDERS = __dirname + "/../customMigrations";
const files = fs.readdirSync(MIGRATION_FOLDERS);

files.forEach((file) => {
  const extension = path.extname(file);

  if (extension === ".js" && file !== "import.js") {
    customMigrations.push({
      name: file,
      ...require(path.join(MIGRATION_FOLDERS, file)),
    });
  }
});

// Custom migration function, handles DB reads and writes
async function migrateTables(phase = "default") {
  for (const customMigration of customMigrations) {
    console.log("Migration custom ", customMigration.name);

    const customMigrationTargetPhase = customMigration.phase || "default";

    if (customMigrationTargetPhase === phase) {
      await customMigration.migrateTables();
    }

    processedTables.push(...customMigration.processedTables);
  }
}

const migrateCustom = {
  processedTables,
  migrateTables,
};

module.exports = {
  migrateCustom,
};
