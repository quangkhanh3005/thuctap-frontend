import { AdsResponse } from "@/types/Ads";
import { useRouter } from "next/navigation";

interface AdRowProps {
  ad: AdsResponse;
  token: string;
}

const AdRow = ({ ad,token }: AdRowProps) => {
  const router = useRouter();
  const showStatus = () => {
    if (ad.status === "Pending") {
      return "Chờ Duyệt";
    } else if (ad.status === "Rejected") {
      return "Từ Chối";
    } else if (ad.status === "Approved") {
      return "Chấp Nhận";
    } else {
      return "Tạm Dừng";
    }
  };
  const handleToPayment = (endDate:string) => {
      const end=new Date(endDate);
      const today=new Date();
      if(end<=today){
        alert("Quảng cáo chưa đến ngày kết thúc");
        return;
      }
    router.push(`/ads-management/${ad.id}/payment`);
  };
  const handleToEdit = () => {
    router.push(`/ads-management/${ad.id}/edit-ads`);
  };

  const checkpayment = ad.status === "Approved"&&new Date(ad.endDate)>new Date();
  const showDelete = ad.status === "Pending" || ad.status === "Rejected";
  const handleViewHoaDon = (id:number) => {
    router.push(`/payment/${id}`)
  };
  const checkEndDate= ()=>{
    const today=new Date();
    if(today>new Date(ad.endDate)){
      return true;
    }
    else{
      return false;
    }
  }
  return (
    <tr key={ad.id} className="hover:bg-gray-50">
      <td className="px-4 py-2 border font-medium ">{ad.title}</td>
      <td className="px-4 py-2 border text-center">{ad.startDate}</td>
      <td className="px-4 py-2 border text-center">{ad.endDate}</td>
      <td className="px-4 py-2 border">
        <span className="px-2 py-1 rounded text-xs font-semibold block text-center">
          {showStatus()}
        </span>
      </td>
      <td className="px-4 py-2 border">{ad.adPlaces.name}</td>
      <td className="px-4 py-2 border text-center">{ad.countClicks}</td>
      <td className="px-4 py-2 border space-x-2 text-center min-w-[335px]">
        {!ad.completed ? (
          <>
            {checkpayment && (
              <button
                onClick={()=>handleToPayment(ad.endDate)}
                className="bg-green-600 py-2 px-3 font-semibold rounded cursor-pointer"
              >
                Thanh Toán
              </button>
            )}
            {checkEndDate()&&
            <>
            <button
              onClick={handleToEdit}
              className="bg-orange-500 py-2 px-3 font-semibold rounded cursor-pointer"
            >
              Sửa
            </button>
            {/* <button
              onClick={()=>handleToPause(ad.id)}
              className="bg-yellow-400 py-2 px-3 font-semibold rounded cursor-pointer"
            >
              Tạm Dừng
            </button> */}
            </>
            }
            {showDelete && (
              <button className="bg-red-500 py-2 px-3 font-semibold rounded cursor-pointer">
                Xóa
              </button>
            )}
          </>
        ) : (
          <button
            onClick={()=>handleViewHoaDon(ad.idPayment)}
            className="bg-blue-600 py-2 px-3 text-white font-semibold rounded cursor-pointer"
          >
            Xem Hóa Đơn
          </button>
        )}
      </td>
    </tr>
  );
};
export default AdRow;
