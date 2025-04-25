import { AdsResponse } from "@/types/Ads";
import { useRouter } from "next/navigation";

interface AdRowProps {
  ad: AdsResponse;
}

const AdRow = ({ ad }: AdRowProps) => {
    const router=useRouter();
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
  const handleToPayment=()=>{
    router.push(`/ads-management/${ad.id}/payment`)
  }
  const checkpayment = ad.status === "Approved" || ad.status === "Paused";
  const showDelete = ad.status === "Pending" || ad.status === "Rejected";
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
      <td className="px-4 py-2 border">
        {ad.adPlaces.name}
      </td>
      <td className="px-4 py-2 border space-x-2 text-center min-w-[335px]">
        {checkpayment && (
          <>
            <button onClick={handleToPayment} className="bg-green-600 py-2 px-3 font-semibold rounded cursor-pointer">
              Thanh Toán
            </button>
          </>
        )}
        <button className="bg-orange-500 py-2 px-3 font-semibold rounded cursor-pointer">
          Sửa
        </button>
        {showDelete && (
          <>
            <button className="bg-red-500 py-2 px-3 font-semibold rounded cursor-pointer">
              Xóa
            </button>
          </>
        )}
      </td>
    </tr>
  );
};
export default AdRow;
