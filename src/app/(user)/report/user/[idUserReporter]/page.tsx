"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
import { BasicUserDTO } from "@/types/User";
import Link from "next/link";
import { headers } from "next/headers";

const ReportUserPage = () => {
  const [reason, setReason] = useState("");
  const params = useParams();
  const idUserReporter = params.idUserReporter as string;
  const [token, setToken] = useState("");
  const router = useRouter();
  const [basicUser, setBasicUser] = useState<BasicUserDTO>();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (tokenSession) {
      setToken(tokenSession);
    }
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${URLAPI}/user/basic/${idUserReporter}`,
          {
            headers: { Authorization: `Bearer ${tokenSession}` },
          }
        );
        setBasicUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [idUserReporter]);
  const handleSendReport = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!reason.trim()){
        alert("Lý do không được để trống!");
        return;
    }
    try {
        const response=await axios.post(`${URLAPI}/report/user/${idUserReporter}`,{
            reason:reason
        },{
            headers:{Authorization: `Bearer ${token}`}
        })
        alert(response.data);
        router.push("/");
    } catch (error) {
        console.error(error);
    }

  };
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold text-center">Báo Cáo Người Dùng</h1>
      <form onSubmit={handleSendReport} className="space-y-3">
        <div className="border mt-4">
          {basicUser && (
            <div className="p-2">
              <div className="flex gap-x-4 items-center">
                <p>Tên tài khoản bị báo cáo:</p>
                <div className="text-lg font-semibold">
                  <Link href={`/profile/${basicUser.id}`}>{basicUser.username} </Link>
                </div>
              </div>
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
export default ReportUserPage;
