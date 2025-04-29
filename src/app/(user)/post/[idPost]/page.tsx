"use client";

import PostLikeButton from "@/components/UserComponents/LikeButton/PostLikeButton";
import PostDetail from "@/components/UserComponents/Post/PostDetail";
import { PostDTO } from "@/types/Post";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import URLAPI from "../../../../../config";
import Comment from "@/components/UserComponents/Comment/CommentItem";
import CommentList from "@/components/UserComponents/Comment/CommentList";
import CommentForm from "@/components/UserComponents/Comment/CommentForm";
import Banner from "@/components/AdvertiserComponents/Banner";
import Footer from "@/components/AdvertiserComponents/Footer";

const PostDetailPage = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostDTO | null>(null);
  const params = useParams();
  const idPost = params.idPost as string;
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const idUserSession = sessionStorage.getItem("idUser");
    const rolesSession = JSON.parse(
      sessionStorage.getItem("roles") || "[]"
    ) as string[];
    if (token) {
      setToken(token);
    }
    if (rolesSession.includes("Admin") || rolesSession.includes("Moderator")) {
      setCheckAdmin(true);
    }
    if (idUserSession && post?.user.id === Number(idUserSession)) {
      setIsOwner(true);
    }
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/post/detail/${idPost}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          console.error(err);
        }
        console.error("Lỗi khi tải chi tiết bài viết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [idPost]);

  if (loading) {
    return <div>Đang tải...</div>;
  }
  if (!post) {
    return <div>Không có dữ liệu!</div>;
  }
  if (post.status !== "Public" && !(checkAdmin || isOwner)) {
    return <div>Bài viết này hiện không khả dụng.</div>;
  }

  return (
    <div>
      <Banner />
      <div className="max-w-3xl mx-auto px-6 py-6 text-gray-800 bg-white rounded-2xl shadow-2xl">
        <PostDetail postDetail={post} />
        <div className="flex gap-x-2 justify-end items-center mt-4">
          <span>Bạn có thích bài viết này:</span>
          <PostLikeButton idPost={post.id} countLikes={post.countLikes} />
        </div>
        <div className="mt-4 border-b">
          <span className="text-lg font-medium ">Bình luận</span>
        </div>
        <div className="mt-4">
          <CommentList idPost={post.id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;
