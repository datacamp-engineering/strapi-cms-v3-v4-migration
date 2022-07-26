const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");
const {
  normalizeComponentType,
} = require("../migrate/helpers/normalizeComponentType");
const { dbV4 } = require("../config/database");

const processedTables = ["components_page_publication_galleries_components"];

async function migrateTables() {
  await migrate(
    "components_page_publication_galleries_components",
    "components_page_publication_galleries_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.components_page_publication_gallery_id,
          component_type: normalizeComponentType(item.component_type),
          field: "publicationGalleryitem",
        },
        ["components_page_publication_gallery_id"]
      )
  );

  await dbV4.raw(
    "update files_related_morphs set field = 'authorImage' where field = 'authorsImage'"
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
