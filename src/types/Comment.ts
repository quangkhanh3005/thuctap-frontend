import { BasicUserDTO } from "./User";
export type StatusComment='APPROVED'|'PENDING'|'REJECTED';
export interface CommentDTO{
    id:number;
    content:string;
    createdAt:string;
    user:BasicUserDTO;
    statusComment:StatusComment;
    parentId:number|null;
    countReplies:number;
    countLikes:number;
}
export interface CommentReport{
    id:number;
    content:string;
    createdAt:string;
    user:BasicUserDTO;
}