"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import URLAPI from "../../../../../../config";
import ChangePassAndEdit from "../components/ChangePassAndEdit";

const ChangePassPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const params = useParams();
  const idUser = params.idUser as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập!");
      router.push("/login");
      return;
    }
    try {
      const response = await axios.put(
        `${URLAPI}/user/change-password/${idUser}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data);
      router.push("/profile");
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) alert("Bạn không có quyền truy cập");
      router.back();
      console.error(error);
    }
  };

  return (
    <div>
      <ChangePassAndEdit id={idUser}/>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Đổi Mật Khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-black">Mật khẩu cũ</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-black">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block font-medium text-black">
              Nhập lại mật khẩu mới
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white py-2 rounded px-4 cursor-pointer"
            >
              Đổi Mật Khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassPage;
