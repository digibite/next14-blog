import useSWR from "swr";
import Post from "../components/Post";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: posts, error } = useSWR("/api/posts", fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
