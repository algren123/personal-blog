import Navbar from '../../components/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import { link } from '../../utils/utilFunctions';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  function handleAddPost() {
    axios
      .post(link() + 'createPost', {
        title,
        content,
        image,
      })
      .then((id) => {
        console.log(`Post ${id} created`);
        window.location.replace('/admin');
      });
  }

  return (
    <div className="min-h-screen h-full bg-gray-800">
      <Navbar />
      <div className="text-center font-bold">
        <h1 className="text-2xl text-white my-5">Add Post</h1>
        <div className="text-white flex flex-col m-5 p-5 bg-gray-900">
          <div className="my-2">
            <h2>Title</h2>
            <input
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
              type="text"
              name="title"
              id="title"
              className="bg-gray-800 p-3 my-2"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button
            className="bg-white text-gray-900 p-2 mx-8 my-8 font-bold"
            onClick={() => handleAddPost()}
          >
            Add post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
