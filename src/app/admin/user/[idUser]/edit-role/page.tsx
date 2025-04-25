"use client";

import { Role, UserDTO } from "@/types/User";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
import { useParams, useRouter } from "next/navigation";

const EditRole = () => {
  const [user, setUser] = useState<UserDTO>();
  const [loading, setLoading] = useState(false);
  const [idRoles, setIdRoles] = useState<number[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const params = useParams();
  const idUser = params.idUser as string;
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/user/admin/roles`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setRoles(response.data);
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
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${URLAPI}/user/admin/user/${idUser}`,
          {
            headers: { Authorization: `Bearer ${tokenSession}` },
          }
        );
        setUser(response.data);
        setIdRoles(response.data.roles.map((role: Role) => role.id));
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
    fetchRoles();
    fetchUser();
  }, []);
  const changeRole = (id: number) => {
    setIdRoles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
    const handleEdit = async () => {
      try {
        await axios.put(
          `${URLAPI}/user/admin/role/${idUser}`,idRoles,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      router.back();
      alert("Thay đổi quyền thành công!");
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      }
    }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded p-6 space-y-3">
      <h1 className="text-center font-semibold text-2xl">Chỉnh Sửa Quyền</h1>
      <div className="flex space-x-2 items-center">
        <p className="w-32">Tên Người Dùng:</p>
        <p className="font-medium">{user?.username}</p>
      </div>
      <div className="flex space-x-2 items-center">
        <p className="w-32">Email:</p>
        <p className="font-medium">{user?.email}</p>
      </div>
      <div className="flex">
        <label htmlFor="role" className="w-32">
          Quyền:
        </label>
        <div className="flex flex-col">
          {roles.length > 0 &&
            roles.map((role) => (
              <label key={role.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={role.id}
                  className="px-4"
                  checked={idRoles.includes(role.id)}
                  onChange={() => changeRole(role.id)}
                />
                <label htmlFor={`role-${role.id}`}>{role.role}</label>
              </label>
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="px-3 py-2 bg-black text-white font-medium rounded cursor-pointer"
          onClick={handleEdit}
        >
          Sửa Quyền
        </button>
      </div>
    </div>
  );
};
export default EditRole;
