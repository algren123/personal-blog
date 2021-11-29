const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedPost = (post) => {
  return {
    id: post.id,
    fields: post.fields,
  };
};

const minifyPosts = (posts) => {
  return posts.map((post) => getMinifiedPost(post));
};

export { table, getMinifiedPost, minifyPosts };
