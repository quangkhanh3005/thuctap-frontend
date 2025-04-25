"use client";
import PostList from "@/components/UserComponents/Post/PostList";
import { PostResponse } from "@/types/Post";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";

const FollowingPostPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, SetLoading] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchPosts = async () => {
      SetLoading(true);
      try {
        const response = await axios.get(`${URLAPI}/post/following`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPosts(response.data);
      } catch (error) {
        const err=error as AxiosError;
        if(err.response?.data){
            console.error(err.response.data);
        }
        console.error(error);
      }
      finally{
        SetLoading(false);
      }
    };
    fetchPosts();
  },[]);
  if(loading){
    return <div>Đang tải dữ liệu ...</div>
  }
  return (
    <div className="containern mx-auto p-4">
      <PostList posts={posts} />
    </div>
  );
};
export default FollowingPostPage;
