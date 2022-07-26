const { dbV4 } = require("../config/database");

const processedTables = [];

async function migrateTables() {
  await dbV4.raw(
    "update components_page_marketo_form_components_components set field = lower(field);"
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
