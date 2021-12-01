import Head from 'next/head';
import Image from 'next/image';
import Feed from '../components/Feed';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div
      className="
    min-h-screen h-full
    bg-gray-800
    "
    >
      <Navbar />
      <div className="lg:mx-48">
        <h1 className="text-4xl font-bold text-white text-center my-10">
          Algren's blog
        </h1>
        <Feed />
      </div>
      <Footer />
    </div>
  );
}
