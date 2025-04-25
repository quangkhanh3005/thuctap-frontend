"use client";

import { usePathname, useRouter } from "next/navigation";

const Navigation=()=>{
    const router=useRouter();
    const pahtName=usePathname();
    const handlToCreatePost=()=>{
        router.push("/create-post");
    }
    const handlToHome=()=>{
        router.push("/");
    }
    const handlToFollowingPost=()=>{
        router.push("/following-post");
    }
    const checkShow=pahtName==="/"||pahtName==="/following-post";
    if(!checkShow){
        return null;
    }
    return(<div className="w-full mx-auto p-4 shadow my-4 rounded sticky top-0 bg-white">
        <div className="flex gap-3 justify-center">
            <button onClick={handlToCreatePost} className="px-4 py-2 bg-gray-200 text-black text-xl font-semibold text-center rounded cursor-pointer hover:bg-gray-300">
                Tạo Bài Viết
            </button>
            <button onClick={handlToHome} className={`px-4 py-2  text-black text-xl font-semibold text-center rounded cursor-pointer hover:bg-gray-300  ${pahtName==="/"?"bg-black text-white":"bg-gray-200"}`}>
                Trang Chủ
            </button>
            <button onClick={handlToFollowingPost} className={`px-4 py-2  text-black text-xl font-semibold text-center rounded cursor-pointer hover:bg-gray-300 ${pahtName==="/following-post"?"bg-black text-white":"bg-gray-200"}`}>
                Bài Viết Theo Dõi
            </button>
        </div>
    </div>);
}
export default Navigation;