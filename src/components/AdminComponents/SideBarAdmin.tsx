import Link from "next/link";
import { useState } from "react";

const SideBarAdmin = () => {
  return (
    <div className="fixed h-full top-16 left-0 w-64 bg-white text-black flex flex-col pt-6 border-r-2 border-black ">
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              href="/admin/dashboard"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-tachometer-alt w-6"></i>
              <span className="ml-3">Bảng Điều Khiển</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-users w-6"></i>
              <span className="ml-3">Quản lý Người Dùng</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/post"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-file-alt w-6"></i>
              <span className="ml-3">Quản lý Bài Viết</span>
            </Link>
          </li>

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
              href="/admin/ad-statistical"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-credit-card w-6"></i>
              <span className="ml-3">Thống Kê Quảng cáo</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/activity-logs"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-history w-6"></i>
              <span className="ml-3">Hóa Đơn Quảng Cáo</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/activity-logs"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-history w-6"></i>
              <span className="ml-3">Quản Lý Danh Mục</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/activity-logs"
              className="flex items-center p-2 rounded-lg hover:bg-black hover:text-white"
            >
              <i className="fas fa-history w-6"></i>
              <span className="ml-3">Quản Lý Thẻ (Tags)</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBarAdmin;
