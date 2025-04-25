"use client";

import { AdsPaymentDTO } from "@/types/Ads";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
import axios from "axios";

const PaymentPage = () => {
  const [adsPayment, setAdsPayment] = useState<AdsPaymentDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const idAds = params.idAds as string;
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);

    const fetchAdsPayment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/ads/payment/${idAds}`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAdsPayment(response.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdsPayment();
  }, [idAds]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!adsPayment) {
    return (
      <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-gray-500 text-lg text-center font-semibold">
          Không tìm thấy thông tin thanh toán
        </div>
      </div>
    );
  }
  const handlePay = async () => {
    try {
      const response = await axios.post(
        `${URLAPI}/payment/vnpay/create`,
        {
          amount: adsPayment.totalPrice,
          orderInfo: adsPayment.id,
          idAds: adsPayment.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const paymentUrl = response.data.data;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Không thể tạo liên kết thanh toán");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Lỗi khi tạo thanh toán");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Thanh toán quảng cáo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Thông tin quảng cáo
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiêu đề:</span>
                    <span className="text-gray-800 font-medium">
                      {adsPayment.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày bắt đầu:</span>
                    <span className="text-gray-800">
                      {adsPayment.startDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày kết thúc:</span>
                    <span className="text-gray-800">{adsPayment.endDate}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Vị trí hiển thị
                </h3>
                <ul className="space-y-1">{adsPayment.places.name}</ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Chi tiết thanh toán
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số lượng nhấp chuột:</span>
                    <span className="text-gray-800">
                      {adsPayment.countClicks}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá mỗi nhấp chuột:</span>
                    <span className="text-gray-800">
                      {adsPayment.priceClick.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-lg font-semibold text-gray-700">
                      Tổng số tiền:
                    </span>
                    <span className="text-lg font-bold text-black">
                      {adsPayment.totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handlePay}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Thanh toán
                </button>
                <p className="mt-2 text-sm text-gray-500"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
