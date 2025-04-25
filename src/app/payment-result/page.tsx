"use client";

import axios from "axios";
import { headers } from "next/headers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../config";

const PaymentResultPage = () => {
  const [checkSuccess, setCheckSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    const fetchSuccess = async () => {
      try {
        const paramsObj: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
          if (key.startsWith("vnp_")) {
            paramsObj[key] = value;
          }
        }  
        const response = await axios.get(`${URLAPI}/payment/vnpay/return`, {
          params: paramsObj,
          headers: {
            Authorization: `Bearer ${tokenSession}`,
          },
        });
    
        if (response.data.code === "00") {
          setCheckSuccess(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchSuccess();
  }, []);
  const handleHome=()=>{
    router.push("/")
  }
  const handleBack=()=>{
    router.push("ads-management");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px] h-[200px] flex flex-col justify-center items-center space-y-4">
        {checkSuccess ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Thanh Toán Thành Công!
            </h2>
            <button onClick={handleHome} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 cursor-pointer">
              Đóng
            </button>
          </>
        ):          <>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Thanh Toán Thất Bại!
        </h2>
        <button onClick={handleBack} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 cursor-pointer">
          Quay Lại
        </button>
      </>}
      </div>
    </div>
  );
};
export default PaymentResultPage;
