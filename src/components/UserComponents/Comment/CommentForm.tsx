"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { headers } from "next/headers";
import { CommentDTO } from "@/types/Comment";

interface CommentFormProps {
  idPost?: number;
  idParentComment?: number;
}
const CommentForm = ({ idPost, idParentComment }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!content.trim()){
      alert("Nội dung không được để trống!");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");

      if (!idParentComment) {
        await axios.post(
          `${URLAPI}/comment/post/${idPost}`,
          { content: content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setContent("");
      }
      else{
        await axios.post(
            `${URLAPI}/comment/reply/${idParentComment}`,
            { content: content },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setContent("");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.data) {
        console.error(err.response.data);
      }
      console.error(error);
    }
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleComment}>
        <div className="flex">
          <textarea
            rows={3}
            className="w-full p-2 border rounded resize-none focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Viết bình luận..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-black "
            >
              Gửi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CommentForm;
