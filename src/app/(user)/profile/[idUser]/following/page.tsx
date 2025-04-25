"use client";

import { BasicUserDTO } from "@/types/User";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
import ListUserFollow from "@/components/UserComponents/User/ListUserFollow";
import { useParams } from "next/navigation";

const FollowingPage = () => {
  const [users, setUsers] = useState<BasicUserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const param=useParams();
  const idUser=param.idUser as string;
  useEffect(() => {
    const token = sessionStorage.getItem("token");

      setLoading(true);
      const fetchFollowingUser = async () => {
        try {
        const response = await axios.get(`${URLAPI}/follow/following/${idUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        console.log(response.data)
    }
      catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          console.error(err.response.data);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    } 
    fetchFollowingUser();
  },[]);
  return (
    <div className="container mx-auto p-4 space-y-3">
      <h2 className="font-bold text-2xl text-center">
        Danh Sách Những Người Bạn Theo Dõi
      </h2>
      {loading ? <p>Đang tải dữ liệu ...</p> :( <div className="flex  justify-center items-center "><ListUserFollow users={users} /></div>)}
      
    </div>
  );
};
export default FollowingPage;
