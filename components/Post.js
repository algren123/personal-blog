import Link from 'next/link';
import { europeanDate, link } from '../utils/utilFunctions';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios';

export const Post = (props) => {
  const { id, fields, admin } = props;
  const { user } = useUser();
  const router = useRouter();

  // Refreshes the bookings for delete/update events (because of ServerSideProps)
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // Handles the delete of a post
  function handleDelete(id) {
    axios.delete(link() + 'deletePost', { data: { id: id } }).then(() => {
      refreshData();
      console.log(`Post with id ${id} has been deleted`);
    });
  }

  return (
    <div className="lg:mx-32">
      <Link href={id}>
        <div
          className="
        p-5
        bg-gray-900 text-white hover:bg-white hover:text-gray-900 font-bold lg:text-2xl
        cursor-pointer
        grid grid-cols-2 justify-between items-center
        "
        >
          <p>{fields.title}</p>
          <p className="ml-auto">{europeanDate(fields.date)}</p>
        </div>
      </Link>
      {admin ? (
        <div
          className="mb-5
        cursor-pointer
        grid grid-cols-2 justify-between items-center"
        >
          <Link href={`/admin/updatepost/${id}`}>
            <button className="bg-white hover:bg-blue-400 font-bold p-3">
              Update
            </button>
          </Link>
          <button
            className="bg-white hover:bg-red-400 font-bold p-3"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
