import { TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

interface PostProps {
  post: {
    id: string;
    name: string;
    description: string;
    image: string;
    profilePicture: string;
    userId: string;
    createdAt: string;
  };
}

function Post({ post }: { post: PostProps['post'] }) {
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    await axios.delete(`http://localhost:8000/api/posts/delete/${post.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    navigate('/');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={post.profilePicture}
              alt={post.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">{post.name}</p>
            <p className="text-sm text-gray-500">
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div>
          <TrashIcon
            className="w-6 h-6 text-gray-500 hover:text-red-500 hover:scale-105 cursor-pointer"
            onClick={handleDeletePost}
          />
        </div>
      </div>
      <p className="mt-4 text-gray-700">{post.description}</p>
      <img src={post.image} alt={post.name} className="mt-4" />

      <div>{}</div>
    </div>
  );
}

export default Post;
