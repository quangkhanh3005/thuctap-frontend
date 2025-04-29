import { PostResponse } from "@/types/Post";
import PostCard from "./PostCard";
import Link from "next/link";

interface PostListProps {
  posts: PostResponse[];
}
const PostList = ({ posts }:PostListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <>
        <div></div>
        <div className="text-center">Hiện không có bài viết nào!</div>
        </>
      )}
    </div>
  );
};
export default PostList;
