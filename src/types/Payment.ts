import { AdsDTO } from "./Ads";
import { BasicUserDTO } from "./User";

export type StatusPayment=    'Pending'| 'Completed'|'Failed';
export interface PaymentDTO{
    id:number;
    totalPrice:number;
    idPayment:string;
    status:StatusPayment;
    ad:AdsDTO;
    advertiser:BasicUserDTO;
}