"use client";
import { BasicUserDTO } from "@/types/User";
import React from "react";
import UserFollowItem from "./UserFollowItem";

interface ListUserFollowProps {
  users: BasicUserDTO[];
}
const ListUserFollow= ({ users }:ListUserFollowProps) => {
  return (
    <div className="flex flex-col space-y-4 shadow-lg rounded-xl p-4 overflow-auto bg-white h-[500px] w-[600px]">
      {users.length > 0 ? (
        users.map((user) => <UserFollowItem key={user.id} user={user} />)
      ) : (
        <p className="text-gray-500 text-base text-center">Hiện danh sách không có người!</p>
      )}
    </div>
  );
};
export default ListUserFollow;
