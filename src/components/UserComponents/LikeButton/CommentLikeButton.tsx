"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/16/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";

interface LikeButtonProps {
  idComment: number;
  countLikes: number;
}
const CommentLikeButton = ({ idComment, countLikes }: LikeButtonProps) => {
  const [checkLike, setCheckLike] = useState(false);
  const [countLike, setCountLike] = useState(countLikes);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    const fetchCheckLike = async () => {
      try {
        const response = await axios.get(
          `${URLAPI}/like/comment/is-like/${idComment}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCheckLike(response.data);
        console.log(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          console.error(err.response.data);
        }
        console.error(error);
      }
    };
    fetchCheckLike();
  }, [idComment]);
  const handleLikeButton = async () => {
      try {
        if (!checkLike) {
          await axios.post(
            `${URLAPI}/like/comment/${idComment}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCheckLike(true);
          setCountLike(countLike + 1);
        } else {
          await axios.delete(
            `${URLAPI}/like/comment/unlike/${idComment}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCheckLike(false);
          setCountLike(countLike -1);
        }
      } catch (error) {
        const err= error as AxiosError;
        if(err.response?.data){
          console.error(err.response.data);
        }
        console.error(error);
      }
    };
  return (
    <div className="flex gap-x-1 items-center">
      <button className="cursor-pointer" onClick={handleLikeButton}>
        {checkLike ? (
          <HandThumbUpIconSolid className="w-6 h-6" />
        ) : (
          <HandThumbUpIconOutline className="w-6 h-6" />
        )}
      </button>
      <span>{countLike}</span>
      <span>lượt thích</span>
    </div>
  );
};
export default CommentLikeButton;
