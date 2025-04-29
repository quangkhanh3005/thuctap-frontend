"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { Tags } from "@/types/Tag";

const TagAdminPage = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [token, setToken] = useState("");
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameCreate, setNameCreate] = useState("");
  const [idTag, setIdTag] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${URLAPI}/tag/all`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        console.log(response.data);
        setTags(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);
  const handleButtonEdit = (idT: number, TagName: string) => {
    setIdTag(idT);
    setName(TagName);
  };
  const handleCancle = () => {
    setIdTag(null);
    setName("");
  };
  const hanldeEdit = async (id: number) => {
    try {
      await axios.put(
        `${URLAPI}/tag/admin/edit/${id}`,
        { name: name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Sửa thành công!");
      setTags(
        tags.map((Tag) =>
          Tag.id === id ? { ...Tag, name: name } : Tag
        )
      );
      handleCancle();
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      }
    }
  };
  const hanldeDelete = async (id: number) => {
    try {
      await axios.delete(`${URLAPI}/tag/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Xóa thành công!");
      setTags(tags.filter((Tag) => Tag.id !== id));
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      } else {
        alert(err.response?.data);
      }
    }
  };
  const handleButtonCreate = () => {
    setIsOpen(!isOpen);
  };
  const handleCreate = async () => {
    try {
      const response = await axios.post(`${URLAPI}/tag/admin/create`,{
        name:nameCreate
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags((item) => [
        ...item,
        { id: response.data.id, name: response.data.name },
      ]);
      setIsOpen(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Bạn không có quyền truy cập!");
        router.push("/");
      }
      alert(err.response?.data);
    }
  };
  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6 flex-wrap mx-auto bg-white p-6 rounded shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 sm:text-xl md:text-2xl lg:text-3xl w-full ">
          Quản Lý Thẻ (Tags)
        </h1>
      </div>
      <div className="mx-auto bg-white p-6 rounded shadow-xl overflow-auto">
        {isOpen ? (
          <div className="flex w-full items-center">
            <div className="flex w-1/2 items-center">
              <label htmlFor="title" className="font-medium w-50">
                Tên Thẻ (Tags)
              </label>

              <input
                type="text"
                className="w-full border rounded-sm mt-2 p-2"
                id="title"
                name="title"
                placeholder="Nhập tên thẻ"
                value={nameCreate}
                onChange={(e) => setNameCreate(e.target.value)}
              />
            </div>
            <div className="flex justify-end w-1/2 space-x-6">
              <button
                onClick={handleCreate}
                className="px-7 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Tạo
              </button>
              <button
                onClick={handleButtonCreate}
                className="px-7 py-2 bg-red-500 text-white rounded cursor-pointer"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleButtonCreate}
              className="px-7 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Thêm Thẻ
            </button>
          </div>
        )}
        <table className="border rounded w-full mt-5">
          <thead>
            <tr>
              <th className="py-2 px-4 border">STT</th>
              <th className="py-2 px-4 border">Tên Thẻ (Tags)</th>
              <th className="py-2 px-4 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {tags.length > 0 &&
              tags.map((Tag, index) => (
                <tr key={Tag.id} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  {idTag === Tag.id ? (
                    <td className="py-2 px-4 border w-[400px] h-20">
                      <input
                        type="text"
                        value={name}
                        className="border text-black p-2 rounded w-full"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td className="py-2 px-4 border w-[400px] h-20">
                      {Tag.name}
                    </td>
                  )}
                  <td className="py-2 px-4 border">
                    {idTag === Tag.id ? (
                      <div className="space-x-4">
                        <button
                          onClick={() => hanldeEdit(Tag.id)}
                          className="px-4 py-2 bg-amber-600 text-white rounded cursor-pointer"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={handleCancle}
                          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <div className="space-x-4">
                        <button
                          onClick={() =>
                            handleButtonEdit(Tag.id, Tag.name)
                          }
                          className="px-4 py-2 bg-amber-600 text-white rounded cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => hanldeDelete(Tag.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TagAdminPage;
