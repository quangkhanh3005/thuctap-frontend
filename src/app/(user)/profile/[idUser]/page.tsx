"use client";

import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import URLAPI from "../../../../../config";
import MyProfile from "./components/MyProfile";
import OtherProfile from "./components/OtherProfile";
import { UserProfile } from "./types/Usertype";
import PostProfile from "./components/PostProfile";
const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userCurrent, setUserCurrent] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const idUserURL = params.idUser as string;
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const idUserCurrent = sessionStorage.getItem("idUser");
        const token = sessionStorage.getItem("token");
        if (!token || !idUserCurrent) {
          alert("Bạn chưa đăng nhập. Vui lòng đăng nhập lại!");
          router.push("/login");
          return;
        }

        setUserCurrent(idUserCurrent);
        const response = await axios.get(
          `${URLAPI}/user/profile/${idUserURL}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 400) {
          alert("Không tồn tại User này!");
        } else if (err.status === 401) {
          alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại!");
          router.push("/login");
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [idUserURL]);
  const isUserCurrent = idUserURL == userCurrent;
  if (!user) {
    return <div>Không tìm thấy dữ liệu</div>;
  }
  if(loading){
    return <div>Đang tải dữ liệu ...</div>
  }
  return (
    <div>
      {isUserCurrent ? <MyProfile user={user} /> : <OtherProfile user={user} />}
      <div className="shadow-md bg-white rounded-xl px-6 py-6 my-6">
        <h1 className="text-xl font-bold text-center">Danh Sách Bài Viết</h1>
      </div>
      <PostProfile idUser={user.id} />
    </div>
  );
};
export default ProfilePage;
