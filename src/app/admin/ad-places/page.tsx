"use client";
import { AdPlaces } from "@/types/Ads";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";

const AdPlacesAdmin = () => {
  const [adPlaces, setAdPlaces] = useState<AdPlaces[]>([]);
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    const fetchAdPalces = async () => {
      try {
        const response = await axios.get(`${URLAPI}/place/all`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAdPlaces(response.data);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchAdPalces();
  }, []);
  const hanldeEdit= (id:number)=>{
    router.push(`/admin/ad-places/${id}/edit`);
  }
  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
          Quản Lý Vị Trí Quảng Cáo
        </h1>
      </div>
      <div className="mx-auto bg-white p-6 rounded shadow-xl">
        <table className="border rounded w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border">STT</th>
              <th className="py-2 px-4 border">Vị Trí</th>
              <th className="py-2 px-4 border">Mô Tả</th>
              <th className="py-2 px-4 border">Số Lượng Quảng Cáo</th>
              <th className="py-2 px-4 border">Giá Tiền Mỗi Lần Nhấp Chuột</th>
              <th className="py-2 px-4 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {adPlaces.length > 0 &&
              adPlaces.map((adPlace, index) => (
                <tr key={adPlace.id} className="text-center">
                  <td className="py-2 px-4 border">{index+1}</td>
                  <td className="py-2 px-4 border">{adPlace.name}</td>
                  <td className="py-2 px-4 border">{adPlace.description}</td>
                  <td className="py-2 px-4 border">{adPlace.maxAd}</td>
                  <td className="py-2 px-4 border">{adPlace.price.toLocaleString("vi-VN")} đ</td>
                  <td className="py-2 px-4 border"><button onClick={()=>hanldeEdit(adPlace.id)} className="px-4 py-2 bg-amber-600 text-white rounded cursor-pointer">Sửa</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdPlacesAdmin;
