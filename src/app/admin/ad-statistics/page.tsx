"use client";
import axios, { AxiosError } from "axios";
import URLAPI from "../../../../config";
import { useEffect, useState } from "react";

import { AdsResponse } from "@/types/Ads";
import { useRouter } from "next/navigation";

const AdStatisticsPage=()=>{
    const [ads, setAds] = useState<AdsResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
      const tokenSession = sessionStorage.getItem("token");
      if (!tokenSession) {
        return;
      }
      const fetchAds = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${URLAPI}/ads/admin/get-all-public`, {
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
    return (
      <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
          Thống Kê Quảng Cáo
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
                  <th className="px-1 py-2 border">Số lần nhấn</th>
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
                      <td className="px-1 py-2 border text-center">
                      {ad.countClicks}
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
}
export default AdStatisticsPage;