"use client";

import PostList from "@/components/UserComponents/Post/PostList";
import { PostResponse } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
interface PostProfileProps{
  idUser:number;
}
const PostProfile = ({idUser}:PostProfileProps) => {
  const [posts,setPosts]=useState<PostResponse[]>([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    const tokenSession=sessionStorage.getItem("token");
    const fetchPosts= async ()=>{
      try {
        setLoading(true);
        const response= await axios.get(`${URLAPI}/post/users/${idUser}`,{
          headers:{Authorization: `Bearer ${tokenSession}`}
        })
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  },[])
  return (
    <PostList posts={posts}/>
  );
};

export default PostProfile;
