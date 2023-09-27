import axios from 'axios';
import { useState, useEffect } from 'react';
import Post from './Post';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post: any) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
