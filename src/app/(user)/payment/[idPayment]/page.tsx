"use client"
import AdCard from "@/components/AdvertiserComponents/AdCard";
import { PaymentDTO, StatusPayment } from "@/types/Payment";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../../config";

const AdPaymentPage = () => {
  const params = useParams();
  const [payment, setPayment] = useState<PaymentDTO>();
  const idPayment = params.idPayment as string;
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${URLAPI}/payment/${idPayment}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayment(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.data) {
          alert(err.response.data);
        } else {
          console.error('Error:', error);
        }
      }
    }
    fetchPayment();
  }, []);
  const renderStatus = () => {
    if (payment?.status === "Completed") {
      return "Thành Công";
    } else if (payment?.status === "Failed") {
      return "Thất bại";
    } else {
      return "Đang xử lý";
    }
  };
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 bg-white rounded shadow-xl p-4 text-center">Chi Tiết Hóa Đơn Quảng Cáo</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Thông tin thanh toán</h2>
    <div className="space-y-2 text-gray-600 text-center">
      <p>
        <strong className="font-medium">ID Thanh Toán:</strong> {payment?.idPayment}
      </p>
      <p>
        <strong className="font-medium">Tổng giá trị:</strong> {payment?.totalPrice.toLocaleString("vi-VN")} VNĐ
      </p>
      <p>
        <strong className="font-medium">Trạng thái thanh toán:</strong> {renderStatus()}
      </p>
    </div>
  </div>

  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Thông tin quảng cáo</h2>
    <div className="space-y-2 text-gray-600">
      <p className="text-center">
        <strong className="font-medium">Tên người đăng:</strong> {payment?.advertiser.username}
      </p>
    </div>
  </div>
  <div className="flex justify-center">
    {payment?.ad ? (
      <AdCard ad={payment.ad} />
    ) : (
      <p className="text-center text-gray-500">Không có quảng cáo</p>
    )}
  </div>
</div>


    </div>
  );
};
export default AdPaymentPage;
