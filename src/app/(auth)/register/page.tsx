"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import URLAPI from "../../../../config";

const RegisterPage =()=>{
    const [email,setEmail]=useState("");
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPass,setConfirmPass]=useState("");
    const router=useRouter();
    const handleRegister = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const response= await axios.post(`${URLAPI}/auth/register`,{
                email:email,
                username:username,
                password:password,
                confirmPass:confirmPass
            });
            if(response.status===200){
                router.push("/login");
            }
        } catch (error) {
            const err= error as AxiosError;
            if(err.response){
                if(err.response.status===400){
                    alert(err.response.data);
                }
            }
            else{
                console.error(error);
            }
        }
    }
    return(<div className="w-full max-w-md bg-white rounded-lg shadow-2xl h-[600px] overflow-auto">
        <h2 className="text-4xl font-semibold text-center pt-8 pb-6">Đăng Ký</h2>
        <form onSubmit={handleRegister} className="space-y-3 px-6" method="post">
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
              onChange={(e)=>setEmail(e.target.value)}
              className="py-2 px-2  border border-gray-400 rounded-md text-base"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="py-2 text-lg">
              UserName
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập UserName"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
              className="py-2 px-2  border border-gray-400 rounded-md text-base"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmpassword" className="py-2 text-lg">
              Nhập Lại Mật Khẩu
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Nhập Lại Mật Khẩu"
              value={confirmPass}
              onChange={(e)=>setConfirmPass(e.target.value)}
              className="py-2 px-2  border border-gray-400 rounded-md text-base"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-center">
              Bạn đã có tài khoản?&nbsp;
              <Link href={"/login"} className="text-blue-400 hover:underline">
                Đăng nhập
              </Link>
            </p>
              <button type="submit" className="h-10 px-6 py-2 bg-blue-400 text-white rounded-lg w-full hover:bg-blue-700 transition-colors duration-200">
                Đăng Ký
              </button>
          </div>
        </form>
      </div>);
}
export default RegisterPage;