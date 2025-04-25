"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
import { CommentReport } from "@/types/Comment";

const ReportCommentPage = () => {
  const [reason, setReason] = useState("");
  const params = useParams();
  const idComment = params.idComment as string;
  const [token, setToken] = useState("");
  const [comment, setComment] = useState<CommentReport>();
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (tokenSession) {
      setToken(tokenSession);
    }
    const fetchComment = async () => {
      try {
        const response = await axios.get(
          `${URLAPI}/comment/report/${idComment}`,
          {
            headers: { Authorization: `Bearer ${tokenSession}` },
          }
        );
        setComment(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }, [idComment]);
  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Lý do báo cáo không được để trống!");
      return;
    }
    try {
      const response = await axios.post(
        `${URLAPI}/report/comment/${idComment}`,
        { reason: reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold text-center">Báo Cáo Bình Luận</h1>
      <form onSubmit={handleSendReport} className="space-y-3">
        <div className="border mt-4">
          {comment && (
            <div className="p-2">
              <div className="flex gap-x-4 items-center">
                <div className="text-lg font-semibold">{comment.user.username}</div>
                <div className="text-gray-500">{new Date(comment.createdAt).toLocaleString("vi-VN")}</div>
              </div>
              <div>{comment.content}</div>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="reason">Lí do báo cáo:</label>
          <textarea
            className="rounded border p-2"
            rows={3}
            name="reason"
            id="reason"
            placeholder="Nhập lí do báo cáo của bạn"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-base text-white px-4 py-2 rounded"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReportCommentPage;
