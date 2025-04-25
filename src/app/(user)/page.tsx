"use client";

import { PostResponse } from "@/types/Post";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../config";
import PostList from "@/components/UserComponents/Post/PostList";
import SildeBar from "@/components/AdvertiserComponents/SideBar";

const Home = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, SetLoading] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchPosts = async () => {
      SetLoading(true);
      try {
        const response = await axios.get(`${URLAPI}/post/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          console.error('Error response data:', err.response.data);
        } else {
          console.error('Error:', error);
        }
      } finally {
        SetLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (loading) {
    return <div className="text-center">Đang tải dữ liệu ...</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar bên trái */}
        <div className="hidden lg:block lg:w-1/4">
          <SildeBar />
        </div>
  
        {/* Post list bên phải */}
        <div className="lg:w-3/4 w-full">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
  
};
export default Home;
