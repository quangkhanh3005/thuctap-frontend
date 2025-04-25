"use client";
import { PostDTO } from "@/types/Post";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { EyeDropperIcon, EyeIcon, EyeSlashIcon, FlagIcon } from "@heroicons/react/16/solid";
interface EllipsisButtonPostProps {
  post: PostDTO;
}
const EllipsisButtonPost = ({ post }: EllipsisButtonPostProps) => {
  const [token, setToken] = useState("");
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isOtherUser, setIsOtherUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    const idUserSession = sessionStorage.getItem("idUser");
    const rolesSession = JSON.parse(
      sessionStorage.getItem("roles") || "[]"
    ) as string[];

    if (tokenSession) {
      setToken(tokenSession);
    }
    if (rolesSession.includes("Admin") || rolesSession.includes("Moderator")) {
      setCheckAdmin(true);
    }
    if (idUserSession && post.user.id === Number(idUserSession)) {
      setIsOwner(true);
    }
    if (idUserSession && post.user.id !== Number(idUserSession)&&!rolesSession.includes("Admin")&&!rolesSession.includes("Moderator")) {
      setIsOtherUser(true);
    }
  }, []);
  const handleEdit = () => {
    router.push(`/post/${post.id}/edit`);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${URLAPI}/post/delete/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push("/");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleHidden = async () => {
    try {
      const response = await axios.put(
        `${URLAPI}/post/hidden/${post.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePublic= async ()=>{
    try {
        const response = await axios.put(
            `${URLAPI}/post/show/${post.id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  }
  const handleReport=()=>{
    router.push(`/report/post/${post.id}`);
  }
  return (
    <div className="absolute right-0 mt-2 w-38 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in">
      {isOwner && (
        <ul className="py-2">
          <li
            onClick={handleEdit}
            className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
          >
            <PencilSquareIcon className="w-5 h-5" />
            Chỉnh sửa
          </li>
          <li
            onClick={handleDelete}
            className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 cursor-pointer"
          >
            <TrashIcon className="w-5 h-5" />
            Xóa
          </li>
        </ul>
      )}
      {checkAdmin && (
        <ul className="py-2">
          {post.status === "Hidden" && (
            <li
              onClick={handlePublic}
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <EyeIcon className="w-5 h-5"/> Hiện
            </li>
          )}
          {post.status === "Public" && (
            <li onClick={handleHidden} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer">
              <EyeSlashIcon className="w-5 h-5"/>Ẩn
            </li>
          )}
        </ul>
      )}
      {isOtherUser && (
        <ul className="py-2">
          <li onClick={handleReport} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer">
          <FlagIcon className="w-5 h-5"/>
            Báo Cáo
          </li>
        </ul>
      )}
    </div>
  );
};

export default EllipsisButtonPost;
