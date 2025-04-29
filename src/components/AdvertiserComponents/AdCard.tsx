"use client";
import { AdsDTO } from "@/types/Ads";
import URLAPI from "../../../config";
interface AdCardProp {
  ad: AdsDTO;
}
const AdCard = ({ ad }: AdCardProp) => {
    const handleToLink=()=>{
        window.location.href=ad.link;
    }
  return (
    <div onClick={handleToLink}
    className="md:min-w-[100px] md:max-w[150px] lg:min-w-[200px] lg:w-auto max-w-[350px]  h-[150px] border rounded-lg p-2 flex-shrink-0 hover:shadow cursor-pointer"
    >
      {ad.image && (
        <img
          src={`${URLAPI}/uploads/${ad.image}`}
          alt={ad.title}
          className="w-full h-24 object-cover rounded-md mb-1"
        />
      )}
      <h4 className="text-sm font-semibold truncate text-center">{ad.title}</h4>
      <p className="text-xs text-gray-600 line-clamp-2 text-center">
        {ad.description}
      </p>
    </div>
  );
};
export default AdCard;
