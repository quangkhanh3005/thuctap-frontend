"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import URLAPI from "../../../../config";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router= useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${URLAPI}/auth/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("idUser", response.data.idUser.toString());
        sessionStorage.setItem("roles", JSON.stringify(response.data.roles));
        router.push('/');
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.status === 401) {
          alert("Sai Tài Khoản Hoặc Mật Khẩu!");
        }
      } else {
        console.error(error);
        alert("Vui Lòng Thử Lại Sau!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-2xl h-[600px] overflow-auto">
      <h2 className="text-4xl font-semibold text-center pt-8 pb-6">
        Đăng Nhập
      </h2>
      <form onSubmit={handleLogin} method="post" className="space-y-3 px-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="py-2 text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-2  border border-gray-400 rounded-md text-base"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="py-2 text-lg">
            Mật Khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập Mật Khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-2  border border-gray-400 rounded-md text-base"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-center">
            Bạn chưa có tài khoản?&nbsp;
            <Link href={"/register"} className="text-blue-400 hover:underline">
              Đăng ký tài khoản.
            </Link>
          </p>
          <button
            type="submit"
            className="h-10 px-6 py-2 bg-blue-400 text-white rounded-lg w-full hover:bg-blue-700 transition-colors duration-200"
          >
            {loading ? "Đang Đăng Nhập..." : "Đăng Nhập"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
