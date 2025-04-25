"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";

interface FollowButtonProp {
  idUser: number;
  onFollowChange?: (isNowFollow: boolean)=>void;
}
const FollowButton = ({ idUser, onFollowChange }: FollowButtonProp) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [token,setToken]=useState("");
  const router=useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if(token){
      setToken(token);
    }
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(
          `${URLAPI}/follow/is-follow/${idUser}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setIsFollowing(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkFollowingStatus();
  }, [idUser]);
  const handleFollow= async()=>{  
    try {
      if(isFollowing){
        await axios.delete(`${URLAPI}/follow/unfollow/${idUser}`,{
          headers:{Authorization: `Bearer ${token}`},
        });
        setIsFollowing(false);
        onFollowChange?.(false);
      }
      else{
        await axios.post(`${URLAPI}/follow/${idUser}`,{
        },{headers:{Authorization:`Bearer ${token}`}});
        setIsFollowing(true);
        onFollowChange?.(true);
      }
    } catch (error) {
      const err=error as AxiosError;
      if(err.status===400){
        console.error(err);
      }
      else if(err.status===401){
        alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại!");
        sessionStorage.clear();
        router.push("/login");
      }
      console.error(error);
    }
  }
  return (
    <button
    onClick={handleFollow}
      className={`px-4 py-2 flex items-center gap-x-2 cursor-pointer rounded-md text-white text-base font-medium ${
        isFollowing
          ? "hover:bg-gray-600 bg-black"
          : "bg-gray-600 hover:bg-black"
      }`}
    >
      {isFollowing ? "Đang Theo Dõi" : "Theo Dõi"}
    </button>
  );
};
export default FollowButton;
