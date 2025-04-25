"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import {
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
  FlagIcon,
} from "@heroicons/react/16/solid";
import { CommentDTO } from "@/types/Comment";
interface EllipsisButtonCommentProps {
  comment: CommentDTO;
  onEdit: () => void;
}
const EllipsisButtonComment = ({
  comment,
  onEdit,
}: EllipsisButtonCommentProps) => {
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
    if (idUserSession && comment.user.id === Number(idUserSession)) {
      setIsOwner(true);
    }
    if (idUserSession && comment.user.id !== Number(idUserSession)&&!rolesSession.includes("Admin")&&!rolesSession.includes("Moderator")) {
      setIsOtherUser(true);
    }
  }, []);
  const handleEdit = () => {
    onEdit();
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${URLAPI}/comment/delete/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleHidden = async () => {
    try {
      const response = await axios.put(
        `${URLAPI}/comment/admin/hide/${comment.id}`,
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
  const handlePublic = async () => {
    try {
      const response = await axios.put(
        `${URLAPI}/comment/admin/show/${comment.id}`,
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
  const handleReport = () => {
    router.push(`/report/comment/${comment.id}`);
  };
  return (
    <div className="absolute right-0 mt-6 w-38 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in">
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
          {comment.statusComment === "HIDDEN" && (
            <li
              onClick={handlePublic}
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <EyeIcon className="w-5 h-5" /> Hiện
            </li>
          )}
          {comment.statusComment === "APPROVED" && (
            <li
              onClick={handleHidden}
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <EyeSlashIcon className="w-5 h-5" />
              Ẩn
            </li>
          )}
        </ul>
      )}
      {isOtherUser && (
        <ul className="py-2">
          <li
            onClick={handleReport}
            className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700 cursor-pointer"
          >
            <FlagIcon className="w-5 h-5" />
            Báo Cáo
          </li>
        </ul>
      )}
    </div>
  );
};

export default EllipsisButtonComment;
