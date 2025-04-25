"use client";
import { CommentDTO } from "@/types/Comment";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { count } from "console";

interface CommentListProps {
  idPost: number;
}
const CommentList = ({ idPost }: CommentListProps) => {
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const roles = JSON.parse(
      sessionStorage.getItem("roles") || "[]"
    ) as string[];
    if (token) {
      setToken(token);
    }
    setRoles(roles);
    const fetchComment = async () => {
      setLoading(true);
      try {
        const checkAdmin =
          roles.includes("Admin") || roles.includes("Moderator");
        const apiurl = checkAdmin
          ? `${URLAPI}/comment/admin/post/${idPost}`
          : `${URLAPI}/comment/user/post/${idPost}`;
        const response = await axios.get(apiurl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          console.error(err.response.data);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComment();
  }, [idPost]);
  if (loading) {
    return <div>Đang tải dữ liệu ...</div>;
  }
  return (
    <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} token={token} />
          ))
        ) : (
          <div>Không có bình luận nào</div>
        )}
      <div>
        <CommentForm idPost={idPost} />
      </div>
    </div>
  );
};
export default CommentList;
