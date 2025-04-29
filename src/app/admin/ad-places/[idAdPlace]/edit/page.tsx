"use client";
import { AdPlaces } from "@/types/Ads";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import URLAPI from "../../../../../../config";
import { useParams, useRouter } from "next/navigation";

const EditAdPlaceAdmin = () => {
  const [adPlace, setAdPlace] = useState<AdPlaces | null>(null);
  const router = useRouter();
  const params = useParams();
  const idAdPlace = params.idAdPlace as string;
  const [editDescription, setEditDescription] = useState<string>("");
  const [editPrice, setEditPrice] = useState<string>("");
  const [editMaxAd, setEditMaxAd] = useState<string>("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchAdPlace = async () => {
      try {
        const response = await axios.get(`${URLAPI}/place/${idAdPlace}`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setAdPlace(response.data);
        setEditDescription(response.data.description);
        setEditMaxAd(response.data.maxAd);
        setEditPrice(response.data.price);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdPlace();
  }, [idAdPlace]);
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDescription.trim()) {
      alert("Không để mô tả trống");
      return;
    }
    try {
      await axios.put(
        `${URLAPI}/place/edit/${idAdPlace}`,
        {
          description: editDescription,
          maxAd: editMaxAd,
          price: editPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Sửa thành công!");
      router.back();
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      }
    }
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
          Chỉnh Sửa Vị Trí Quảng Cáo
        </h1>
      </div>
      <button
        onClick={handleBack}
        className="ml-5 text-lg py-2 px-4 bg-black text-white rounded cursor-pointer"
      >
        {" "}
        Quay Lại
      </button>
      <div className="mx-auto max-w-2xl bg-white p-6 rounded shadow-xl">
        <form className="space-y-4">
          <div>
            <label htmlFor="place" className="font-medium">
              Vị Trí
            </label>
            <input
              type="text"
              className="w-full border rounded-sm mt-2 p-2 bg-gray-200"
              id="place"
              name="place"
              placeholder="Nhập tiêu đề"
              disabled
              value={adPlace?.name || ""}
            />
          </div>
          <div>
            <label htmlFor="content" className="font-medium">
              Nội dung
            </label>
            <textarea
              rows={2}
              className="w-full border rounded-sm mt-2 p-2"
              id="content"
              name="content"
              placeholder="Nhập nội dung"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="font-medium">
              Giá Tiền
            </label>
            <input
              type="number"
              className="w-full border rounded-sm mt-2 p-2"
              id="price"
              name="price"
              placeholder="Nhập giá"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxAd" className="font-medium">
              Số Lượng Quảng Cáo
            </label>
            <input
              type="number"
              className="w-full border rounded-sm mt-2 p-2"
              id="maxAd"
              name="maxAd"
              placeholder="Nhập số lượng"
              value={editMaxAd}
              onChange={(e) => setEditMaxAd(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleEdit}
              className="px-4 py-2 rounded cursor-pointer bg-amber-600 text-white"
            >
              Sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdPlaceAdmin;
