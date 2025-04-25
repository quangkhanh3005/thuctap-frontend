"use client";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { UserProfile } from "../types/Usertype";
import { useRouter } from "next/navigation";
interface MyProfileProps {
  user: UserProfile;
}
const MyProfile = ({ user }: MyProfileProps) => {
  const router = useRouter();
  const handleFollower = () => {
    router.push(`/profile/${user.id}/follower`);
  };
  const handleFollowing = () => {
    router.push(`/profile/${user.id}/following`);
  };
  return (
    <div className="shadow-md h-44 bg-white rounded-2xl px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
        <div className="flex flex-col space-y-4 ">
          <h2 className="text-4xl font-bold text-center md:text-left">
            {user?.username}
          </h2>
          <div className="flex space-x-8 justify-center md:justify-start">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={handleFollower}
            >
              <span className="font-bold text-lg">{user?.countFollowers}</span>
              <span className="font-medium text-lg text-gray-600">
                Người Theo Dõi
              </span>
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={handleFollowing}
            >
              <span className="font-bold text-lg">{user?.countFollowing}</span>
              <span className="font-medium text-lg text-gray-600">
                Đang Theo Dõi
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 justify-center md:justify-end">
          <button className="bg-gray-600 hover:bg-black px-4 py-2 flex items-center gap-x-2 cursor-pointer rounded-md text-white text-base font-medium">
            <PencilSquareIcon className="h-5 w-5" />
            Chỉnh Sửa Thông Tin
          </button>
          <button className="bg-gray-600 hover:bg-black px-4 py-2 cursor-pointer rounded-md text-white text-base font-medium">
            Trang Quản Trị
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
