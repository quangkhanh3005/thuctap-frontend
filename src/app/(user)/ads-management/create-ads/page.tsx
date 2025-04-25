"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import URLAPI from "../../../../../config";
import { useRouter } from "next/navigation";
import { AdPlaces } from "@/types/Ads";

const CreateAdsPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idPlace, setIdPlace] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [places, setPlaces] = useState<AdPlaces[]>([]);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (tokenSession) {
      setToken(tokenSession);
    }
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${URLAPI}/place/all`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setPlaces(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaces();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề quảng cáo");
      return;
    }
    if (!description.trim()) {
      alert("Vui lòng nhập mô tả");
      return;
    }
    if (!link.trim()) {
      alert("Vui lòng nhập đường dẫn");
      return;
    }
    if (!startDate || !endDate) {
      alert("Vui lòng chọn ngày bắt đầu và kết thúc");
      return;
    }
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start < today || end < today) {
      alert("Ngày bắt đầu và kết thúc không được nhỏ hơn ngày hiện tại");
      return;
    }

    if (start > end) {
      alert("Ngày bắt đầu không được sau ngày kết thúc");
      return;
    }
    if (!idPlace) {
      alert("Vui lòng chọn vị trí hiển thị");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("idPlace", idPlace.toString());
    if (image) {
      formData.append("img", image);
    }
    try {
      const response = await axios.post(`${URLAPI}/ads/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Tạo quảng cáo thành công!");
      console.log(response.data);
      router.push("/ads-management");
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 400) {
        alert(err.response?.data);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold text-center">Tạo Quảng Cáo Mới</h1>

      <div>
        <label className="font-medium">Tiêu đề:</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">Mô tả:</label>
        <textarea
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="font-medium">Liên kết:</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="font-medium">Ngày bắt đầu:</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="font-medium">Ngày kết thúc:</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <select
        value={idPlace}
        onChange={(e) => setIdPlace(Number(e.target.value))}
        className="border border-gray-300 rounded px-4 py-2 w-full"
      >
        <option value={0} disabled>
          -- Chọn vị trí --
        </option>
        {places.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name} {" "} {place.description}
          </option>
        ))}
      </select>

      <div>
        <label className="font-medium block">Hình ảnh:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Tạo Quảng Cáo
      </button>
    </div>
  );
};

export default CreateAdsPage;
