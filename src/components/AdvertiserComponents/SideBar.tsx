"use-client";
import { AdsDTO } from "@/types/Ads";
import axios from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../config";
import AdCard from "./AdCard";

const SildeBar = () => {
  const [ads, setAds] = useState<AdsDTO[]>([]);

  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
        console.warn("Không tìm thấy token trong sessionStorage");
        return;
      }
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${URLAPI}/ads/sidebar`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAds(response.data);
      } catch (error) {
        console.error("Lỗi khi tải quảng cáo:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow space-y-4">
      <h3 className="text-lg font-bold">Quảng Cáo</h3>

      {ads.length === 0 ? (
        <p className="text-gray-500 text-sm">Không có quảng cáo nào.</p>
      ) : (
        ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))
      )}
    </div>
  );
};
export default SildeBar;
