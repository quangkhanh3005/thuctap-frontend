"use client";

import { AdsResponse } from "@/types/Ads";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";


const ReportAdminPage = () => {
  const [ads, setAds] = useState<AdsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchAds = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/ads/admin/pending`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAds(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 403) {
          alert("Bạn không có quyền truy cập!");
          router.push("/");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);
  if (loading) {
    return <div>Đang tải dữ liệu ...</div>;
  }
  const handleApproved = async (idAd: number) => {
    try {
      await axios.put(
        `${URLAPI}/ads/admin/approve/${idAd}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Quảng cáo đã được duyệt!");
      setAds(ads.filter((prev) => prev.id !== idAd));
    } catch (error) {
      const err=error as AxiosError;
      alert(err.response?.data);
      console.error(error);
    }
  };
  const handleRejected = async (idAd: number) => {
    try {
      await axios.put(
        `${URLAPI}/ads/admin/reject/${idAd}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Quảng cáo đã được từ chối!");
      setAds(ads.filter((prev) => prev.id !== idAd));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto py-4">
    <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
      <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
        Quản Lý Quảng Cáo
      </h1>
      {ads.length > 0 ? (
        <div className="min-w-full overflow-auto mt-5">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="px-1 py-2 border">Hình Ảnh</th>
                <th className="px-1 py-2 border">Tiêu Đề</th>
                <th className="px-1 py-2 border">Đường Dẫn</th>
                <th className="px-1 py-2 border">Ngày Bắt Đầu</th>
                <th className="px-1 py-2 border">Ngày Kết Thúc</th>
                <th className="px-1 py-2 border">Vị Trí</th>
                <th className="px-1 py-2 border">Nhà Quảng Cáo</th>
                <th className="px-1 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-2 py-2 border">
                    <img
                      className="w-50"
                      src={`${URLAPI}/uploads/${ad.image}`}
                      alt=""
                    />
                  </td>
                  <td className="px-2 py-2 border">{ad.title}</td>
                  <td className="px-1 py-2 border text-center">{ad.link}</td>
                  <td className="px-2 py-2 border">{ad.startDate}</td>
                  <td className="px-2 py-2 border">{ad.endDate}</td>
                  <td className="px-1 py-2 border text-center">
                    {ad.adPlaces.name}
                  </td>
                  <td className="px-1 py-2 border text-center">
                    {ad.advertiser.username}
                  </td>
                  <td className="px-2 py-2 border ">
                    <div className="flex justify-center  space-x-3">
                      <button
                        onClick={() => handleApproved(ad.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleRejected(ad.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
                      >
                        Từ Chối
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Hiện tại không có yêu cầu quảng cáo nào</div>
      )}
    </div>
    </div>
  );
};
export default ReportAdminPage;
