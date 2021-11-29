import { table, getMinifiedPost } from './utils/Airtable';

export default async (req, res) => {
  const { id } = req.body;
  try {
    const deletedPosts = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedPost(deletedPosts[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
