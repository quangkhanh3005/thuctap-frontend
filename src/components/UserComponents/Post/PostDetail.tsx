"use client";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { PostDTO } from "@/types/Post";
import UserFollowItem from "@/components/UserComponents/User/UserFollowItem";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/16/solid";
import URLAPI from "../../../../config";
import EllipsisButtonPost from "../EllipsisButton/EllipsisButtonPost";

interface PostDetailProps {
  postDetail: PostDTO;
}

const PostDetail = ({ postDetail }: PostDetailProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  useEffect(() => {
    const idUserSession = Number(sessionStorage.getItem("idUser"));
    if (idUserSession) {
      setIsOwner(postDetail.user.id === idUserSession);
    }
  }, []);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold">{postDetail.title}</h1>
      {isOwner ? (
        ""
      ) : (
        <div className="flex items-center gap-2 py-6">
          <span className="text-black text-xl">Người đăng:</span>
          <div className="flex-1">
            <UserFollowItem user={postDetail.user} />
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div className="text-base text-gray-500 mb-6 mt-4">
          <span>
            Thời Gian Đăng:{" "}
            {postDetail.browsedAt?new Date(postDetail.browsedAt).toLocaleString("vi-VN"):new Date(postDetail.createAt).toLocaleString("vi-VN")}
          </span>
        </div>
        <div className="relative inline-block">
          <EllipsisVerticalIcon
            className="w-5 h-5 fill-black cursor-pointer"
            onClick={handleOpen}
          />
          {isOpen && <EllipsisButtonPost post={postDetail} />}
        </div>
      </div>
      <div>
        {postDetail.media.length>0?(<div className="mb-6 space-y-4">
          {postDetail.media.map((media)=>{
            return(
              <div key={media.id}>
                {
                  media.type==="img"&& <img  src={`${URLAPI}/uploads/${media.name}`} alt={`${media.id}`} className="object-contain w-full h-[400px]"/>
                }
                {
                  media.type==="video"&& <video className="object-contain w-full h-[400px]" controls>
                    <source src={`${URLAPI}/uploads/${media.name}`} type="video/mp4"/>
                    Trình duyệt bạn không hỗ trợ phát
                  </video>
                }
              </div>
            )
          })}
        </div>):""}
      </div>
      <div className="leading-relaxed text-lg whitespace-pre-line text-justify mb-8">
        {parse(postDetail.content)}
      </div>
      <div className="text-right text-base text-black mb-8">
        {postDetail.user.username}
      </div>
      <div className="flex gap-2 mt-4 pt-4">
        <div className="items-center">
          <span className="align-middle">Danh Mục: </span>
        </div>

        <span className="text-sm text-white bg-black px-2.5 py-2 rounded cursor-pointer">
          {postDetail.category.name}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 pt-4">
        <div className="items-center">
          <span className="align-middle">Tag: </span>
        </div>
        {postDetail.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-sm text-white bg-black px-2.5 py-2 rounded cursor-pointer"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
