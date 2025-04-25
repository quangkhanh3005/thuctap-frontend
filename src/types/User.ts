export interface BasicUserDTO{
    id:number;
    username:string;
}
export interface Role{
    id:number;
    role:string;
}
export interface UserDTO{
    id:number;
    username:string;
    email:string;
    createAt:string;
    roles:Role[];
}