const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["components_blog_trending"];

async function migrateTables() {
  await migrate(
    "components_blog_trending",
    "components_blog_trendings",
    (item) =>
      omit(
        {
          ...item,
        },
        ["blog"]
      )
  );

  await migrate(
    "components_blog_trending",
    "components_blog_trendings_blog_links",
    (item) =>
      omit(
        {
          trending_id: item.id,
          blog_id: item.blog,
        },
        ["id", "blog"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
