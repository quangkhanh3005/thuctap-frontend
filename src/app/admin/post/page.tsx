"use client";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import PostCard from "@/components/UserComponents/Post/PostCard"; // Giữ nguyên PostCard như bạn đã có
import URLAPI from "../../../../config";
import { PostResponse } from "@/types/Post";
import { useRouter } from "next/navigation";

const AdminPostPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/post/admin/pending`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 403) {
          alert("Bạn không có quyền truy cập!");
          router.push("/");
        }
      }
      finally{
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const approvePost = async (postId: number) => {
    try {
      await axios.put(
        `${URLAPI}/post/admin/show/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bài viết đã được duyệt!");
      setPosts(posts.filter((item) => item.id !== postId));
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      }
    }
  };

  const rejectPost = async (postId: number) => {
    try {
      await axios.put(
        `${URLAPI}/post/admin/hidden/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bài viết đã bị từ chối!");
      setPosts(posts.filter((item) => item.id !== postId));
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      }
    }
  };
  if (loading) {
    return <div>Đang tải dữ liệu ...</div>;
  }
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4 text-center bg-white p-4 rounded shadow-lg">
        Duyệt Bài Viết
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col border-b-2 border-gray-300 pb-4"
            >
              <PostCard post={post} />
              <div className="flex justify-center space-x-5 mt-4">
                <button
                  onClick={() => approvePost(post.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
                >
                  Duyệt
                </button>
                <button
                  onClick={() => rejectPost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
                >
                  Từ Chối
                </button>
              </div>
            </div>
          ))
        ) : (
          <>
            <div></div>
            <p className="text-center text-lg">
              Hiện tại không có bài viết nào
            </p>{" "}
            <></>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPostPage;
