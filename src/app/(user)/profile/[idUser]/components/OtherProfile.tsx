"use client";
import FollowButton from "@/components/UserComponents/FollowButton/FollowButton";
import { useState } from "react";
import { UserProfile } from "../types/Usertype";
import { useRouter } from "next/navigation";

interface OtherProfileProps {
  user: UserProfile;
}
const OtherProfile = ({ user }: OtherProfileProps) => {
  const [countFollowers, setCountFollower] = useState(user.countFollowers);
  const handleFollowChange = (isNowFollow: boolean) => {
    setCountFollower((prev) => prev + (isNowFollow ? 1 : -1));
  };
    const router = useRouter();
    const handleFollower = () => {
      router.push(`/profile/${user.id}/follower`);
    };
    const handleFollowing = () => {
      router.push(`/profile/${user.id}/following`);
    };
    const handleReport=()=>{
      router.push(`/report/user/${user.id}`)
    }
  return (
    <div className="shadow-md h-56 bg-white rounded-2xl px-6 py-6 md:h-44">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
        <div className="flex flex-col space-y-4 ">
          <h2 className="text-4xl font-bold text-center md:text-left">
            {user?.username}
          </h2>
          <div className="flex space-x-8 justify-center items-center md:justify-start">
            <div className="flex flex-col items-center space-x-1 cursor-pointer md:flex-row" onClick={handleFollower}>
              <span className="font-bold text-lg">{countFollowers}</span>
              <span className="font-medium text-base text-gray-600 md:text-lg">
                Người Theo Dõi
              </span>
            </div>
            <div className="flex flex-col items-center space-x-1 cursor-pointer md:flex-row" onClick={handleFollowing}>
              <span className="font-bold text-lg">{user?.countFollowing}</span>
              <span className="font-medium text-base text-gray-600 md:text-lg">
                Đang Theo Dõi
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end gap-x-4">
          <FollowButton idUser={user.id} onFollowChange={handleFollowChange}/>
          <button onClick={handleReport} className="cursor-pointer px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-black">Báo Cáo</button>
        </div>
      </div>
    </div>
  );
};
export default OtherProfile;
