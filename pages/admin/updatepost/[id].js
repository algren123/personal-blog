import Navbar from '../../../components/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import { link } from '../../../utils/utilFunctions';
import { useRouter } from 'next/router';

function UpdatePost({ posts }) {
  const router = useRouter();
  const { id } = router.query;

  let post = posts.filter((post) => post.id === id);
  post = post[0].fields;

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);

  function handleCreatePost() {
    const params = {
      id: id,
      fields: {
        title,
        content,
        image,
      },
    };
    axios.post(link() + 'updatePost', params).then((id) => {
      console.log(`Post ${id} updated`);
      window.location.replace('/admin');
    });
  }

  return (
    <div className="min-h-screen h-full bg-gray-800">
      <Navbar />
      <div className="text-center font-bold">
        <h1 className="text-2xl text-white my-5">Update Post</h1>
        <div className="text-white flex flex-col m-5 p-5 bg-gray-900">
          <div className="my-2">
            <h2>Title</h2>
            <input
              defaultValue={post.title}
              type="text"
              name="title"
              id="title"
              className="bg-gray-800 p-3 my-2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-2">
            <h2>Content</h2>
            <textarea
              defaultValue={post.content}
              type="text"
              name="title"
              id="title"
              className="bg-gray-800 p-3 my-2"
              cols="24"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="my-3">
            <h2>Image Link</h2>
            <input
              defaultValue={post.image}
              type="text"
              name="title"
              id="title"
              className="bg-gray-800 p-3 my-2"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button
            className="bg-white text-gray-900 p-2 mx-8 my-8 font-bold"
            onClick={() => handleCreatePost()}
          >
            Update post
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const posts = await axios.get(link() + 'getPosts').then((res) => res.data);
  if (!posts) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      posts,
    },
  };
}

export default UpdatePost;
