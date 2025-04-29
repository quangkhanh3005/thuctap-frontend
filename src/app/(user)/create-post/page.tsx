"use client";
import axios from "axios";
import React, { FormEventHandler, useEffect, useState } from "react";
import URLAPI from "../../../../config";
import { Category } from "@/types/Category";
import { Tags } from "@/types/Tag";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Editor } from "@tinymce/tinymce-react";


const CreatePostPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [token, setToken] = useState("");
  const [tags, setTags] = useState<Tags[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [idCategory, setIdCategory] = useState<number>(0);
  const [idTags, setIdTags] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (tokenSession) {
      setToken(tokenSession);
    }
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${URLAPI}/category/all`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get(`${URLAPI}/tag/all`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        setTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
    fetchTags();
  }, []);
  const handleSelectTag = (id: number) => {
    setIdTags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    const maxSizeInBytes = 99 * 1024 * 1024;
    if (selectedFiles) {
      const newFile = Array.from(selectedFiles);

      const flag = newFile.some((file) => file.size > maxSizeInBytes);
      if (flag) {
        e.target.value = "";
        alert("Có ảnh hoặc video trên 100MB. Vui lòng chọn lại!");
        return;
      }
      setFiles(newFile);
      e.target.value = "";
    }
  };
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Không được để trống tiêu đề!");
      return;
    }
    if (!content.trim()) {
      alert("Không được để trống nội dung!");
      return;
    }
    if (!idCategory) {
      alert("Phải chọn danh mục!");
      return;
    }
    if (idTags.length < 1) {
      alert("Phải chọn tag!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("idCategory", idCategory.toString());
    idTags.forEach((tag) => {
      formData.append("idTags", tag.toString());
    });
    files.forEach((file) => {
      formData.append("files", file);
    });
    try {
      await axios.post(`${URLAPI}/post/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIdTags([]);
      setIdCategory(0);
      setTitle("");
      setContent("");
      setFiles([]);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleBack=()=>{
    router.back();
  }
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <div className="grid grid-cols-3 mb-6">
        <div onClick={handleBack} className="flex items-end hover:underline cursor-pointer">
          <ChevronLeftIcon className="w-6 h-6" />
          <p className="text-lg">Quay Lại</p>
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-semibold">Tạo Bài Viết</h1>
          <div></div>
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="font-medium">
            Tiêu đề
          </label>
          <input
            type="text"
            className="w-full border rounded-sm mt-2 p-2"
            id="title"
            name="title"
            placeholder="Nhập tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
  <label htmlFor="content" className="font-medium">
    Nội dung
  </label>
  <Editor
    apiKey="984mwkxf8dtdq0mqs8ro239c1euhnedqfq54iawct34y0z9q"
    value={content}
    onEditorChange={(newContent) => setContent(newContent)}
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar:
        'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
  />
</div>

        <div>
          <label htmlFor="category" className="font-medium">
            Danh mục
          </label>
          <select
            className="w-full border rounded-sm mt-2 p-2 text-base"
            id="category"
            name="category"
            value={idCategory}
            onChange={(e) => setIdCategory(Number(e.target.value))}
          >
            <option value={0} disabled>
              Chọn danh mục
            </option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="tag" className="font-medium">
            Chọn thẻ tag
          </label>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-2 pl-6">
            {tags.length > 0 &&
              tags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-2">
                  <input
                    key={tag.id}
                    type="checkbox"
                    name="tag"
                    value={tag.id}
                    onChange={() => handleSelectTag(tag.id)}
                  />
                  <span>{tag.name}</span>
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="media" className="font-medium">
            Chọn ảnh hoặc video
          </label>
          <input
            type="file"
            multiple
            className="mt-2 file:px-4 file:py-2 file:bg-gray-700 file:text-white file:rounded file:border-0 file:cursor-pointer "
            id="media"
            name="media"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCreatePost}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-700"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePostPage;
