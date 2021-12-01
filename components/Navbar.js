import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

function Navbar() {
  const { user } = useUser();
  const [click, setClick] = useState(false);
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 bg-gray-900 text-center">
      <div className="flex items-center flex-shrink-0 text-white lg:ml-32">
        <Link href="/">
          <a className="font-semibold text-xl tracking-tight">
            Algren&apos;s Blog
          </a>
        </Link>
      </div>
      <div className="block lg:hidden" onClick={() => setClick(!click)}>
        <button className="flex items-center px-3 py-2 border rounded text-white border-gray-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          (click ? 'block' : 'hidden') +
          ' w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:mr-32'
        }
      >
        <div className="text-sm lg:ml-auto">
          <Link href="/">
            <a
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
              onClick={() => setClick(false)}
            >
              Posts
            </a>
          </Link>
          <Link href="https://algrenpauna.com" target="_blank">
            <a
              target="_blank"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
              onClick={() => setClick(false)}
            >
              Portfolio
            </a>
          </Link>
          {user &&
          user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS ? (
            <Link href="/admin">
              <a
                className="mx-2 block lg:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-gray-400 mt-4 lg:mt-0"
                onClick={() => setClick(false)}
              >
                Admin
              </a>
            </Link>
          ) : (
            ''
          )}
          {!user ? (
            <Link href="/api/auth/login">
              <a
                className="mx-2 block lg:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-gray-400 mt-4 lg:mt-0"
                onClick={() => setClick(false)}
              >
                Sign In
              </a>
            </Link>
          ) : (
            <Link href="/api/auth/logout">
              <a
                className="mx-2 block lg:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-white hover:bg-gray-400 mt-4 lg:mt-0"
                onClick={() => setClick(false)}
              >
                Logout
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
