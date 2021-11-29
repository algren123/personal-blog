import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { europeanDate } from '../utils/utilFunctions';

const Post = (props) => {
  const { id, fields } = props;
  return (
    <Link href={id}>
      <div
        className="
      p-5 m-5
      bg-gray-900 text-white hover:bg-white hover:text-gray-900 font-bold
      cursor-pointer
      grid grid-cols-2 justify-between items-center
      "
      >
        <p>{fields.title}</p>
        <p className="ml-auto">{europeanDate(fields.date)}</p>
      </div>
    </Link>
  );
};

function Feed() {
  const [posts, setPosts] = useState([]);

  // Get the posts from DB
  useEffect(async () => {
    await axios.get('/api/getPosts').then((res) => {
      res.data.sort((a, b) => {
        return a.fields.date < b.fields.date ? 1 : -1;
      });
      setPosts(res.data);
    });
  }, [setPosts]);

  return (
    <div className="mx-10 lg:mx-96">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} fields={post.fields} />
      ))}
    </div>
  );
}

export default Feed;
