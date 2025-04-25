import { Category} from "./Category";
import { Media } from "./Media";
import { Tags } from "./Tag";
import { BasicUserDTO } from "./User";
export type PostStatus = 'Draft'| 'Pending'| 'Public'|'Reject';

export interface PostResponse{
    id:number;
    title:string;
    createAt:string;
    user:BasicUserDTO;
    tagNames:string[];
    categoryName:string;
    img:string;
    statusPost: PostStatus;
}
export interface PostDTO{
    id: number;
    title: string;
    content: string;
    createAt: string;
    user: BasicUserDTO;
    media: Media[]
    category: Category;
    tags: Tags[];
    status: PostStatus;
    countLikes: number;
    countComments: number;
}
