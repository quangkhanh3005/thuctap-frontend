"use client";
import { CommentDTO } from "@/types/Comment";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { useRouter } from "next/navigation";

const CommentAdmin = () => {
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/comment/admin/pending`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        console.log(response.data);
        setComments(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 403) {
          alert("Bạn không có quyền truy cập!");
          router.push("/");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);
  if (loading) {
  }
  const handleApproved = async (idComment: number) => {
    try {
      await axios.put(
        `${URLAPI}/comment/admin/approved/${idComment}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bình luận đã được duyệt!");
      setComments(comments.filter((prev)=>prev.id!==idComment))
    } catch (error) {
      console.error(error);
    }
  };
  const handleRejected = async (idComment: number) => {
    try {
      await axios.put(
        `${URLAPI}/comment/admin/rejected/${idComment}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bình luận đã được từ chối!");
      setComments(comments.filter((prev)=>prev.id!==idComment))
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto py-4 ">
      <h1 className="text-3xl font-bold mb-4 text-center bg-white p-4 rounded shadow-lg w-full">
        Duyệt Bình Luận
      </h1>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="flex flex-col max-w-200 mx-auto">
            <div className="bg-white p-4 shadow-lg rounded">
              <div className="flex justify-between px-2 mt-2">
                <div className="flex space-x-2 items-center">
                  <p className="font-normal text-lg">Người tạo:</p>
                  <p className="font-semibold text-xl">{comment.user.username}</p>
                </div>
                <div className="flex space-x-2">
                  <p className="font-normal text-lg">Thời gian:</p>
                  <p className="font-semibold text-lg">{new Date(comment.createdAt).toLocaleString("vi-VN")}</p>
                </div>
              </div>
              <div>
                <div className="py-4 px-2 border rounded bg-gray-50 mt-4">
                  <p className="break-words">{comment.content}</p>
                </div>

                <div className="flex justify-center space-x-24 mt-6">
                  <button onClick={()=>handleApproved(comment.id)} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
                    Duyệt
                  </button>
                  <button onClick={()=>handleRejected(comment.id)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600">
                    Từ Chối
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default CommentAdmin;
