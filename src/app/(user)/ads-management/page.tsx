"use client";
import { AdsResponse } from "@/types/Ads";
import axios from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { useRouter } from "next/navigation";
import AdRow from "./components/AdRow";

const AdsManagementPage = () => {
  const [ads, setAds] = useState<AdsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    const fetchAds = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/ads/advertiser`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAds(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);
  const handleToCreateAds = () => {
    router.push("/ads-management/create-ads");
  };
  if (loading) {
    return <div>Đang tải dữ liệu</div>;
  }
  return (
    <div className="p-8 bg-white shadow-xl rounded">
      <div className="flex justify-between items-center mb-6 flex-wrap mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl w-full sm:w-auto">
          Quản Lý Quảng Cáo
        </h1>
        <button
          onClick={handleToCreateAds}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto mt-4 sm:mt-0"
        >
          Tạo Quảng Cáo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 border">Tiêu đề</th>
              <th className="px-4 py-2 border">Ngày bắt đầu</th>
              <th className="px-4 py-2 border">Ngày kết thúc</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Vị trí hiển thị</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {ads.map((ad) => (
              <AdRow key={ad.id} ad={ad} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdsManagementPage;
