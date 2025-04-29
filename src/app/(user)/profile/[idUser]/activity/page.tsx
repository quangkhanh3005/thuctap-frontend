"use client";

import { ActivityLogs } from "@/types/Activity";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";

const ActivityPage = () => {
  const params = useParams();
  const idUser = params.idUser as string;
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityLogs[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      alert("Vui lòng đăng nhập!");
      router.push("/login");
      return;
    }
    setToken(tokenSession);
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/activity/user/${idUser}`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setActivities(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          console.error(err);
          alert(err.response.data);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [idUser]);
  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
          Nhật Ký Hoạt Động
        </h1>
      </div>
      {activities.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có hoạt động nào.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white p-4 rounded-lg shadow-md space-y-5"
            >
              <div className="text-black text-xl flex">
                <strong className="w-30">Hoạt động:</strong>
                <p>{activity.activity}</p>
              </div>
              <div className="text-black text-lg flex">
                <strong className="w-30">Thời gian:</strong>
                <p>{new Date(activity.createdAt).toLocaleString("vi-VN")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ActivityPage;
