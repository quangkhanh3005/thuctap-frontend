"use client";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [idUser, setIsUser] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const idUserCurrent = sessionStorage.getItem("idUser");
    const roleSession = sessionStorage.getItem("roles");
    if (!idUserCurrent) {
      router.push("/login");
      return;
    }
    if (roleSession) {
      setRoles(JSON.parse(roleSession));
    }
    setIsUser(idUserCurrent);
  }, []);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    router.push("/login");
  };
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div onClick={() => setIsOpen(false)}>
          <Link href="/">
            <img src="/logo.png" alt="logo" className="h-14 w-auto lg:pl-6" />
          </Link>
        </div>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleDropDown}
          >
            <UserCircleIcon className="w-10 h-10 " />
            <ChevronDownIcon className="pt-3 w-8 h-8 " />
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-4 w-52 bg-white rounded drop-shadow-2xl cursor-pointer z-50">
              <div
                className="block px-6 py-4 text-base hover:bg-gray-100 text-black"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/profile/${idUser}`}>Trang Cá Nhân</Link>
              </div>
              {(roles.includes("Admin") ||
                roles.includes("Editor") ||
                roles.includes("Moderator")) && (
                <div
                  className="block px-6 py-4 text-base hover:bg-gray-100 text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={`/admin`}>Trang Quản Trị</Link>
                </div>
              )}
              <div
                className="block px-6 py-4 text-base hover:bg-gray-100 text-black"
                onClick={() => setIsOpen(false)}
              >
                <Link href={`/report`}>Báo Cáo Của Bạn</Link>
              </div>
              {roles.includes("Advertiser") && (
                <div
                  className="block px-6 py-4 text-base hover:bg-gray-100 text-black"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={`/ads-management`}>Trang Quảng Cáo</Link>
                </div>
              )}
              <div
                className="block px-6 py-4 text-base hover:bg-gray-100 text-black "
                onClick={handleLogOut}
              >
                Đăng Xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
