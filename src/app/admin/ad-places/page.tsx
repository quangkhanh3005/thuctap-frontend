"use client";
import { AdPlaces } from "@/types/Ads";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdPlacesAdmin = () => {
  const [adPlaces, setAdPlaces] = useState<AdPlaces[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div>
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
                    <th className="py-2 px-4 border">Tên</th>
                    <th className="py-2 px-4 border">Mô Tả</th>
                    <th className="py-2 px-4 border">Số Lượng Quảng Cáo</th>
                    <th className="py-2 px-4 border">Giá Tiền Mỗi Lần Nhấp Chuột</th>
                </tr>
            </thead>
            <tbody>
                <tr className="text-center">
                    <td className="py-2 px-4 border">1</td>
                    <td className="py-2 px-4 border">1</td>
                    <td className="py-2 px-4 border">1</td>
                    <td className="py-2 px-4 border">1</td>
                    <td className="py-2 px-4 border">1</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>

  );
};
export default AdPlacesAdmin;
