import { BasicUserDTO } from "./User";

export type TargetType='Post'|'Comment'|'Ad'|'User';
export type Action= 'Login'|'CreatePost'|'EditPost'|'DeletePost'|'Report'|'CommentPost'|'EditComment'|'DeleteComment'|'CreateAd'|'ClickAd';
export interface ActivityLogs{
    id:number;
    activity:string;
    createdAt:string;
    idUser:number;
    idTarget:number;
    action:Action;
    targetType:TargetType;
}