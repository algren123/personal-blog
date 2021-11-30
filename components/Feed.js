import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from './Post';

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
        <Post key={post.id} id={post.id} fields={post.fields} admin={false} />
      ))}
    </div>
  );
}

export default Feed;
