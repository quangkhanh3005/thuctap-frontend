"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const SideBarAdmin = () => {
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const storedRoles = sessionStorage.getItem("roles");
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
  }, []);

  return (
    <div className="fixed h-full top-16 left-0 w-64 bg-white text-black flex flex-col pt-6 border-r-2 border-black ">
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {roles.includes("Admin") && (
            <li>
              <Link
                href="/admin/user"
                className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
              >
                <i className="fas fa-users w-6"></i>
                <span className="ml-3">Quản lý Người Dùng</span>
              </Link>
            </li>
          )}
          {(roles.includes("Admin") ||
            roles.includes("Editor") ||
            roles.includes("Moderator")) && (
            <li>
              <Link
                href="/admin/post"
                className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
              >
                <i className="fas fa-file-alt w-6"></i>
                <span className="ml-3">Quản lý Bài Viết</span>
              </Link>
            </li>
          )}
          {(roles.includes("Admin") || roles.includes("Moderator")) && (
            <>
              <li>
                <Link
                  href="/admin/comment"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-comments w-6"></i>
                  <span className="ml-3">Quản lý Bình Luận</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/reports"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-flag w-6"></i>
                  <span className="ml-3">Quản lý Báo Cáo</span>
                </Link>
              </li>
            </>
          )}
          {roles.includes("Admin") && (
            <>
              <li>
                <Link
                  href="/admin/ads"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-ad w-6"></i>
                  <span className="ml-3">Quản lý Quảng Cáo</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/ad-places"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-history w-6"></i>
                  <span className="ml-3">Vị Trí Quảng Cáo</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/ad-statistics"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-credit-card w-6"></i>
                  <span className="ml-3">Thống Kê Quảng cáo</span>
                </Link>
              </li>
            </>
          )}
          {roles.includes("Admin") && (
            <>
              <li>
                <Link
                  href="/admin/category"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-history w-6"></i>
                  <span className="ml-3">Quản Lý Danh Mục</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/tags"
                  className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <i className="fas fa-history w-6"></i>
                  <span className="ml-3">Quản Lý Thẻ (Tags)</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBarAdmin;
