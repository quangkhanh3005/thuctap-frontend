import { CommentReport } from "./Comment";
import { PostResponse } from "./Post";
import { BasicUserDTO } from "./User";

export type StatusReport='Pending'|'Accepted'|'Rejected';

export interface ReportDTO{
    id:number;
    reason:string;
    createdAt:string;
    approvedAt:string;
    user:BasicUserDTO;
    userReported?:BasicUserDTO|null;
    comment?:CommentReport|null;
    post?:PostResponse|null;
    status:StatusReport;
}