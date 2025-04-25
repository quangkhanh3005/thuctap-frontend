"use client";
import { UserDTO } from "@/types/User";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../config";
import { useRouter } from "next/navigation";
import UserRow from "./UserRow";

const AdminUserPage = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/user/admin/users`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setUsers(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 403) {
          alert("Bạn không có quyền truy cập!");
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  if (loading) {
    return <div>Đang tải dữ liệu ...</div>;
  }
  return (
    <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
      <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
        Quản Lý Người Dùng
      </h1>
      <div className="min-w-full overflow-auto mt-5">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="px-1 py-2 border">STT</th>
              <th className="px-1 py-2 border">Tên Người Dùng</th>
              <th className="px-1 py-2 border">Email</th>
              <th className="px-1 py-2 border">Ngày Tạo</th>
              <th className="px-1 py-2 border">Quyền</th>
              <th className="px-1 py-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserRow key={user.id} stt={index+1} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUserPage;
