import { table, minifyPosts } from './utils/Airtable';

export default async (req, res) => {
  try {
    const posts = await table.select({}).firstPage();
    const minifiedPosts = minifyPosts(posts);
    res.statusCode = 200;
    res.json(minifiedPosts);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
