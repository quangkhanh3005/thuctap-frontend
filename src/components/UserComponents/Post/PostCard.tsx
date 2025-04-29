import { PostResponse } from "@/types/Post";
import URLAPI from "../../../../config";
import Link from "next/link";

interface PostCardProps {
  post: PostResponse;
}

const PostCard = ({ post }: PostCardProps) => {
  const nameStatus = () => {
    if (post.statusPost === "Draft") {
      return "Bản Nháp";
    } else if (post.statusPost === "Pending") {
      return "Chờ Duyệt";
    } else {
      return "Công Khai";
    }
  };
  return (
    <Link href={`/post/${post.id}`}>
      <div className="bg-white shadow-md rounded overflow-hidden h-80 md: px-4 py-4 cursor-pointer">
        <div className="flex flex-col space-y-1 h-full">
          <div className="flex flex-row flex-wrap justify-between">
            <h2 className="w-full text-xl font-bold text-black hover:text-gray-400 cursor-pointer break-words">
              {post?.title}
            </h2>
            <span className="text-gray-700">{nameStatus()}</span>
          </div>
          <div className="flex flex-row space-x-2 md:flex-col h-full justify-center">
            <div className="aspect-w-16 aspect-h-9 w-1/3">
              <img
                src={post?.img ? `${URLAPI}/uploads/${post?.img}` : "/logo.png"}
                className=" object-contain w-full max-h-[100px]"
                alt={post?.title}
              />
            </div>
            <div className="flex flex-col w-2/3 justify-center">
              <p className="text-base">{post?.categoryName}</p>
              <div className="flex flex-wrap gap-2">
                {post?.tagNames.map((tag, index) => {
                  return <p key={index}>{tag}</p>;
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-between top">
            <p>{post?.user.username}</p>
            {post.browsedAt ? (
              <p className="italic text-sm text-gray-500">
                Ngày đăng: {new Date(post?.browsedAt).toLocaleString("vi-VN")}
              </p>
            ) : (
              <p className="italic text-sm text-gray-500">
                Ngày tạo: {new Date(post?.createAt).toLocaleString("vi-VN")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
