"use client";

import { CommentDTO } from "@/types/Comment";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import CommentLikeButton from "../LikeButton/CommentLikeButton";
import CommentReplyList from "./CommentReplyList";
import CommentForm from "./CommentForm";
import EllipsisButtonComment from "../EllipsisButton/EllipsisButtonComment";
import axios from "axios";
import URLAPI from "../../../../config";
interface CommentItemProps {
  comment: CommentDTO;
  token: string;
}
const CommentItem = ({ comment, token }: CommentItemProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [content, setContent] = useState(comment.content);
  const toggleReplyComment = () => {
    setShowReplyComment(!showReplyComment);
  };
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleEdit = () => {
    setIsEdit(true);
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsEdit(false);
    setEditContent(content);
  };
  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      alert("Nội dung không được để trống!");
      return;
    }
    try {
      await axios.put(
        `${URLAPI}/comment/edit/${comment.id}`,
        { content: editContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContent(editContent);
      setIsEdit(false)
    } catch (error) {
      console.error(error);
      setEditContent(content);
      setIsEdit(false);
    }
  };
  return (
    <div className={`mb-4 ${comment.parentId ? "ml-4" : ""}`}>
      <div className="p-4 rounded bg-gray-100 shadow-md ">
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <div className="text-lg font-bold">{comment.user.username}</div>
            <div className=" text-gray-500">
              {new Date(comment.createdAt).toLocaleString("vi-VN")}
            </div>
          </div>
          <div className="relative inline-block">
            <EllipsisVerticalIcon
              onClick={handleOpen}
              className="w-5 h-5 fill-black cursor-pointer"
            />
            {isOpen && (
              <EllipsisButtonComment comment={comment} onEdit={handleEdit} />
            )}
          </div>
        </div>
        {isEdit ? (
          <div>
            <textarea
              rows={3}
              className="w-full p-2 border rounded resize-none focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Viết bình luận..."
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="space-x-5">
              <button
                onClick={handleSaveEdit}
                className="bg-black px-3 py-2 rounded-md text-white cursor-pointer hover:bg-gray-700"
              >
                Lưu
              </button>
              <span
                onClick={handleCancel}
                className="cursor-pointer hover:underline"
              >
                Hủy
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-700 mt-1">{content}</div>
        )}
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <CommentLikeButton
            idComment={comment.id}
            countLikes={comment.countLikes}
          />
          <div
            className="font-medium cursor-pointer"
            onClick={toggleReplyComment}
          >
            {showReplyComment?<p>Hủy</p>:<p>Trả Lời</p>}
          </div>
        </div>
      </div>
      {showReplyComment && <CommentForm idParentComment={comment.id} />}
      {comment.countReplies > 0 && (
        <button
          className="text-black font-semibold hover:underline my-2 ml-2"
          onClick={toggleReplies}
        >
          {showReplies ? "" : `Xem ${comment.countReplies} phản hồi`}
        </button>
      )}
      {showReplies && <CommentReplyList idParentComment={comment.id} />}
    </div>
  );
};

export default CommentItem;
