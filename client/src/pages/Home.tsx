import AddPost from '../components/AddPost';
import PostList from '../components/PostList';

export default function Home() {
  return (
    <div>
      <AddPost />
      <div>
        {/* <PostList /> */}
        <PostList />
      </div>
    </div>
  );
}
