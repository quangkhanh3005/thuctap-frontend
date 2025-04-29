import { BasicUserDTO } from "./User";

export interface AdPlaces {
    id:number;
    name:string;
    description:string;
    maxAd:number;
    price:number;
}
export type StatusAd = "Pending" | "Approved" | "Paused" | "Rejected";
export interface AdsResponse {
  id: number;
  title: string;
  description: string;
  status: StatusAd;
  startDate: string;
  endDate: string;
  link: string;
  image: string;
  advertiser: BasicUserDTO;
  adPlaces: AdPlaces;
  countClicks:number;
  completed:boolean;
  idPayment:number;
}

export interface AdsPaymentDTO{
    id:number;
    title:string;
    startDate:string;
    endDate:string;
    places:AdPlaces;
    countClicks:number;
    priceClick:number;
    totalPrice:number;
}
export interface AdsDTO{
    id:number;
    title:string;
    description:string;
    image:string;
    advertiser:BasicUserDTO;
    link:string;
}
