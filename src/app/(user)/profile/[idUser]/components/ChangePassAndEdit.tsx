import { usePathname, useRouter } from "next/navigation";
interface ChangePassAndEditProps{
    id:string;
}
const ChangePassAndEdit=({id}:ChangePassAndEditProps)=>{
    const pathname=usePathname();
    const router=useRouter();
    const handleToEdit=()=>{
        router.push(`/profile/${id}/edit`);
    }
    const handleToChange=()=>{
        router.push(`/profile/${id}/change-pass`);
    }
    return(
        <div className="max-w-2xl my-6 bg-white mx-auto shadow rounded flex">
                <div onClick={handleToEdit} className={`w-1/2 flex justify-center items-center font-semibold py-3 text-lg cursor-pointer ${pathname===`/profile/${id}/edit` ? "bg-black text-white" : "bg-white text-black"}`}>Thay Đổi Thông Tin</div>
                <div onClick={handleToChange} className={`w-1/2 flex justify-center items-center font-semibold py-3 text-lg cursor-pointer ${pathname===`/profile/${id}/change-pass` ? "bg-black text-white" : "bg-white text-black"}`}>Đổi Mật Khẩu</div>
        </div>
    )
}
export default ChangePassAndEdit;