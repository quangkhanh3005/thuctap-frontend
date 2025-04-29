"use client";

import { PostResponse } from "@/types/Post";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../config";
import PostList from "@/components/UserComponents/Post/PostList";
import SildeBar from "@/components/AdvertiserComponents/SideBar";
import Banner from "@/components/AdvertiserComponents/Banner";
import Footer from "@/components/AdvertiserComponents/Footer";

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
          console.error("Error response data:", err.response.data);
        } else {
          console.error("Error:", error);
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
    <div className="w-full lg:w-1/4">
      <SildeBar />
    </div>
    <div className="flex flex-col w-full lg:w-3/4 gap-4">
      <div className="w-full">
        <Banner />
      </div>
      <div className="w-full">
        <PostList posts={posts} />
      </div>
      <div className="w-full">
      <Footer />
      </div>
    </div>
  </div>
</div>

  );
};
export default Home;
