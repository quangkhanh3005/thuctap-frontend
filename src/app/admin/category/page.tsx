"use client";
import { Category } from "@/types/Category";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";

const CategoryAdminPage = () => {
  const [categories, setcategories] = useState<Category[]>([]);
  const [token, setToken] = useState("");
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameCreate, setNameCreate] = useState("");
  const [idCategory, setIdCategory] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchcategories = async () => {
      try {
        const response = await axios.get(`${URLAPI}/category/all`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        console.log(response.data);
        setcategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcategories();
  }, []);
  const handleButtonEdit = (idC: number, categoryName: string) => {
    setIdCategory(idC);
    setName(categoryName);
  };
  const handleCancle = () => {
    setIdCategory(null);
    setName("");
  };
  const hanldeEdit = async (id: number) => {
    try {
      await axios.put(
        `${URLAPI}/category/admin/edit/${id}`,
        { name: name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Sửa thành công!");
      setcategories(
        categories.map((category) =>
          category.id === id ? { ...category, name: name } : category
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
      await axios.delete(`${URLAPI}/category/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Xóa thành công!");
      setcategories(categories.filter((category) => category.id !== id));
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
      const response = await axios.post(`${URLAPI}/category/admin/create`,{
        name:nameCreate
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setcategories((item) => [
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
          Quản Lý Danh Mục
        </h1>
      </div>
      <div className="mx-auto bg-white p-6 rounded shadow-xl">
        {isOpen ? (
          <div className="flex w-full items-center">
            <div className="flex w-1/2 items-center">
              <label htmlFor="title" className="font-medium w-50">
                Tên Danh Mục
              </label>

              <input
                type="text"
                className="w-full border rounded-sm mt-2 p-2"
                id="title"
                name="title"
                placeholder="Nhập danh mục"
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
              Thêm Danh Mục
            </button>
          </div>
        )}
        <table className="border rounded w-full mt-5">
          <thead>
            <tr>
              <th className="py-2 px-4 border">STT</th>
              <th className="py-2 px-4 border">Tên Danh Mục</th>
              <th className="py-2 px-4 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <tr key={category.id} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  {idCategory === category.id ? (
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
                      {category.name}
                    </td>
                  )}
                  <td className="py-2 px-4 border">
                    {idCategory === category.id ? (
                      <div className="space-x-4">
                        <button
                          onClick={() => hanldeEdit(category.id)}
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
                            handleButtonEdit(category.id, category.name)
                          }
                          className="px-4 py-2 bg-amber-600 text-white rounded cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => hanldeDelete(category.id)}
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
export default CategoryAdminPage;
