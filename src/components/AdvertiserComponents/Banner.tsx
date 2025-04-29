"use client";
import { AdsDTO } from "@/types/Ads";
import axios from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../config";
import AdCard from "./AdCard";

const Banner = () => {
  const [ads, setAds] = useState<AdsDTO[]>([]);

  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      console.warn("Không tìm thấy token trong sessionStorage");
      return;
    }

    const fetchAds = async () => {
      try {
        const response = await axios.get(`${URLAPI}/ads/header`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAds(response.data);
      } catch (error) {
        console.error("Lỗi khi tải quảng cáo:", error);
      }
    };

    fetchAds();
  }, []);

  if (ads.length === 0) return null;

  return (
    <div className="hidden md:block bg-white p-4 shadow rounded-2xl mb-4">
      <div className="flex gap-2 justify-center">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
