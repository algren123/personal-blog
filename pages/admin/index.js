import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import axios from 'axios';
import { Post } from '../../components/Post';
import { link } from '../../utils/utilFunctions';

function Admin({ posts }) {
  const { user } = useUser();

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS) {
    return (
      <Link href="/">
        <p>
          You don't have permission to view this page. Click here to go back.
        </p>
      </Link>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen h-full">
      <Navbar />
      <div className="text-center">
        <h1 className="text-gray-200 font-bold text-4xl my-6">Admin</h1>
        <Link href="/admin/addpost">
          <button className="text-base text-gray-200 border-gray-200 border-2 py-2 px-3 m-5">
            Add post
          </button>
        </Link>
        <div>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              fields={post.fields}
              admin={true}
            />
          ))}
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

export default Admin;
