const { omit } = require("lodash");
const { migrate } = require("../migrate/helpers/migrate");

const processedTables = ["components_page_blog_post_cards_components"];

async function migrateTables() {
  await migrate(
    "components_page_blog_post_cards_components",
    "components_page_blog_post_cards_components",
    (item) =>
      omit(
        {
          ...item,
          entity_id: item.components_page_blog_post_card_id,
          component_type: "page.blog-posts-card-items",
          field: "blogPostsCardItem",
        },
        ["components_page_blog_post_card_id"]
      )
  );
}

module.exports = {
  processedTables,
  migrateTables,
  phase: "post-migration",
};
