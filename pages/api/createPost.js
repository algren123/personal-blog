import { table, minifyPosts } from './utils/Airtable';

export default async (req, res) => {
  const { title, content, image } = req.body;

  try {
    let date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    const createdPosts = await table.create([
      {
        fields: {
          title,
          date: month + '/' + day + '/' + year,
          content,
          image,
        },
      },
    ]);

    const createdPost = {
      id: createdPosts[0].id,
      fields: createdPosts[0].fields,
    };
    res.statusCode = 200;
    res.json(createdPost);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
