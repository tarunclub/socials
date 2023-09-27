import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

interface Post {
  id: string;
  name: string;
  description: string;
  image: string;
  profilePicture: string;
  userId: string;
  createdAt: string;
}

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem('token');
  const { profileId } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/profile/${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setProfilePicture(response.data.user.profilePicture);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await axios.get(
          'http://localhost:8000/api/posts/user',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.posts);
        setPosts(response.data.posts);
      };
      getPosts();
    } catch (error: any) {
      console.log(error.response.data);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* User Information */}
        <div className="flex items-center space-x-4">
          <img
            src={profilePicture}
            alt={name}
            className="h-20 w-20 rounded-full object-cover border-4 border-indigo-500"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>
      {/* User Posts */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">My Posts</h3>
        <ul className="mt-4 space-y-4 max-w-lg mx-auto">
          {posts.map((post: Post) => (
            <Post post={post} key={post.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
