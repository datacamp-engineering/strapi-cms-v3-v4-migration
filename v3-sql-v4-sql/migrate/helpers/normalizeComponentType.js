const { singular } = require("pluralize");

const singularExclusionsList = [
  "table-of-contents",
  "recent-jobs",
  "course-tracks",
  "blog-post-cards",
  "skills",
  "skill-courses",
  "buttons",
  "key-quotes",
  "key-takeaways",
];

const normalizeComponentType = (value) => {
  const normalizedValue = value
    .replace("components_page_", "page.")
    .replace("components_blog_", "blog.")
    .replace("components_podcast_", "podcast.")
    .replace("components_seo_", "seo.")
    .replace(/_/g, "-");

  return singularExclusionsList.find((i) => normalizedValue.includes(i))
    ? normalizedValue
    : singular(normalizedValue);
};

module.exports = {
  normalizeComponentType,
};
