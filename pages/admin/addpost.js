import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { link } from '../../utils/utilFunctions';
import { EditorState, RichUtils } from 'draft-js';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  // Draft.JS implementation [START]
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  function handleReturn(e) {
    console.log(e.shiftKey);
    if (e.shiftKey) {
      setEditorState(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }
    return 'not-handled';
  }
  // Draft.JS implementation [END]

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
      <div className="text-center font-bold lg:mx-auto lg:w-1/2 p-5">
        <h1 className="text-2xl text-white my-5">Add Post</h1>
        <div className="text-white flex flex-col p-5 bg-gray-900">
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
            <Editor
              placeholder="Write something!"
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              handleReturn={handleReturn}
              wrapperClassName="p-5"
              editorClassName="bg-gray-800 my-4 px-4"
              toolbarClassName="toolbar-class text-black font-normal"
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
