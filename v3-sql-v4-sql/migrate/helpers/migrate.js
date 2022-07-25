const {
  dbV3,
  dbV4,
  isPGSQL,
  isMYSQL,
  isSQLITE,
} = require("../../config/database");
const { BATCH_SIZE } = require("./constants");
const { migrateItems } = require("./migrateFields");

const tables_to_ignore = [
  "components_page_features",
  "components_page_content_menus",
  "components_page_items",
  "components_page_quotes_sections",
  "components_page_top_scroll_sections",
  "components_page_join_companies_blocks",
  "components_page_footer_contents",
  "components_page_headers",
  "components_page_section_items",
  "components_page_bottom_scroll_sections",
  "components_page_header_content_blogs",
  "components_page_quotes_slider_items",
  "components_page_help_tabs_items",
  "components_page_sections",
  "components_page_image_tips",
  "components_page_links",
  "components_page_schedule_call_form_landing_pages",
  "components_page_content_footers",
  "components_page_posted_ins",
  "components_page_quotes_sliders",
  "components_page_scroll_items",
  "components_page_get_starters",
  "components_page_company_highlight",
  "components_blog_podcast_headers",
  "components_page_help_tabs",
  "components_page_resources_list_items",
  "components_seo_seos",
  "components_page_company_images",
  "components_page_resources_lists",
  "components_page_rounded_page_titles",
  "components_page_resources_carousels",
  "components_page_image_text_blocks",
  "components_page_notorious_companies",
  "components_page_resources",
  "components_page_interactive_hero_image_landing_pages",
  "components_page_bottom_scroll_sections_components",
  "components_page_footer_contents_components",
  "components_page_quotes_sections_components",
  "components_page_scroll_items_components",
  "components_page_top_scroll_sections_components",
  "components_page_company_highlight_components",
  "components_page_header_content_blogs_components",
  "components_page_content_footers_components",
  "components_page_notorious_companies_components",
  "components_page_interactive_hero_image_landing_pages_components",
  "components_page_resources_carousels_components",
  "components_page_help_tabs_components",
  "components_page_quotes_sliders_components",
  "components_page_schedule_call_form_landing_pages_components",
  "components_page_sections_components",
  "navs_components",
  "articles",
  "articles_components",
  "pages",
  "pages_components",
  "technologies",
  "navs",
  "top_viewed_blogs",
  "topics",
  "local_health",
  "components_page_trendings",
  "category_index_pages",
  "category_index_pages_components",
  "components_page_columnar_page_headers",
  "components_page_three_column_info_blocks",
  "components_page_headers_components",
  "components_page_resources_lists_components",
];

async function migrate(source, destination, itemMapper = undefined) {
  if (tables_to_ignore.includes(source)) {
    console.log(`skipping migration for ${source}`);
    return false;
  }

  if (isMYSQL) {
    const sourceNotExists =
      (await dbV3.raw(`SHOW TABLES LIKE '%${source}%';`))[0].length === 0;
    const destinationNotExists =
      (await dbV4.raw(`SHOW TABLES LIKE '%${destination}%';`))[0].length === 0;

    if (sourceNotExists) {
      console.log(`SOURCE TABLE ${source} DOES NOT EXISTS`);
      return false;
    }

    if (destinationNotExists) {
      console.log(`DESTINATION TABLE ${destination} DOES NOT EXISTS`);
      return false;
    }
  }

  if (isSQLITE) {
    // SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}';

    const sourceNotExists =
      (
        await dbV3("sqlite_master")
          .select("name")
          .where("type", "table")
          .where("name", source)
          .first()
          .count()
      )["count(*)"] === 0;

    const destinationNotExists =
      (
        await dbV4("sqlite_master")
          .select("name")
          .where("type", "table")
          .where("name", destination)
          .first()
          .count()
      )["count(*)"] === 0;

    if (sourceNotExists) {
      console.log(`SOURCE TABLE ${source} DOES NOT EXISTS`);
      return false;
    }

    if (destinationNotExists) {
      console.log(`DESTINATION TABLE ${destination} DOES NOT EXISTS`);
      return false;
    }
  }

  if (isPGSQL) {
    //  SELECT FROM information_schema.tables
    //  WHERE  table_schema = 'schema_name'
    //  AND    table_name   = 'table_name'

    const sourceNotExists =
      (
        await dbV3("information_schema.tables")
          .select("table_name")
          .where("table_schema", "public")
          .where("table_name", source)
      ).length === 0;

    const destinationNotExists =
      (
        await dbV4("information_schema.tables")
          .select("table_name")
          .where("table_schema", "public")
          .where("table_name", destination)
      ).length === 0;

    if (sourceNotExists) {
      console.log(`SOURCE TABLE ${source} DOES NOT EXISTS`);
      return false;
    }

    if (destinationNotExists) {
      console.log(`DESTINATION TABLE ${destination} DOES NOT EXISTS`);
      return false;
    }
  }

  const count =
    (await dbV3(source).count().first()).count ||
    (await dbV3(source).count().first())["count(*)"];
  const columnsInfo = await dbV3(source).columnInfo();

  const jsonFields = Object.keys(columnsInfo).filter((column) => {
    return columnsInfo[column].type === "jsonb";
  });

  console.log(`Migrating ${count} items from ${source} to ${destination}`);
  await dbV4(destination).del();
  for (let page = 0; page * BATCH_SIZE < count; page++) {
    console.log(`${source} batch #${page + 1}`);
    const items = await dbV3(source)
      .limit(BATCH_SIZE)
      .offset(page * BATCH_SIZE);

    const withParsedJsonFields = items.map((item) => {
      if (jsonFields.length > 0) {
        jsonFields.forEach((field) => {
          item[field] = JSON.stringify(item[field]);
        });
      }

      return item;
    });

    const migratedItems = migrateItems(withParsedJsonFields, itemMapper);
    if (migratedItems.length > 0) {
      await dbV4(destination)
        .insert(migratedItems)
        .catch((err) => console.log(err));
    }
  }

  await resetTableSequence(destination);
}

async function resetTableSequence(destination) {
  if (isPGSQL) {
    const hasId = await dbV4.schema.hasColumn(destination, "id");
    if (hasId) {
      const seq = `${destination.slice(0, 56)}_id_seq`;
      await dbV4.raw(
        `SELECT SETVAL ('${seq}', (SELECT MAX(id) + 1 FROM ${destination}))`
      );
    }
  }
}

module.exports = {
  migrate,
  resetTableSequence,
};
