import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { europeanDate } from '../utils/utilFunctions';

function PostView({ posts }) {
  const router = useRouter();
  const { id } = router.query;
  let post = posts.filter((post) => post.id === id);
  post = post[0].fields;

  return (
    <div className="bg-gray-800 min-h-screen h-full">
      <Navbar />
      <div className="text-center text-gray-200">
        <h1 className="text-4xl font-bold text-gray-200 mt-5 text-center">
          {post.title}
        </h1>
        <h2 className="text-normal my-1">By Algren Pauna</h2>
        <h2 className="text-normal">{europeanDate(post.date)}</h2>
        <p className="text-gray-200 m-3 mt-10">{post.content}</p>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const link =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/getPosts'
      : '';
  const posts = await axios.get(link).then((res) => res.data);
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

export default PostView;
