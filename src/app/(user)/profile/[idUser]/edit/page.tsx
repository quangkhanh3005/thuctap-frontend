"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import URLAPI from "../../../../../../config";
import ChangePassAndEdit from "../components/ChangePassAndEdit";

const EditUserPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const params = useParams();
  const idUser = params.idUser as string;
  const router = useRouter();

  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");

    if (!tokenSession) {
      alert("Vui lòng đăng nhập!");
      router.push("/login");
      return;
    }

    setToken(tokenSession);

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${URLAPI}/user/get-update/${idUser}`,
          {
            headers: { Authorization: `Bearer ${tokenSession}` },
          }
        );

        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 403) alert("Bạn không có quyền truy cập");
        router.back();
      }
    };
    fetchProfile();
  }, [idUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username && !email) {
      alert("Không được để trống cả Username và Email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${URLAPI}/user/update-profile`,
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data);
      router.push("/profile");
    } catch (error) {
      const err = error as AxiosError;
      alert(err.response?.data || "Lỗi khi cập nhật thông tin");
    }
  };

  return (
    <div>
        <ChangePassAndEdit id={idUser}/>
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Chỉnh sửa thông tin cá nhân
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">
            Tên người dùng
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên mới..."
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email mới..."
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white py-2 rounded px-4 cursor-pointer"
          >
            Cập Nhật
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditUserPage;
