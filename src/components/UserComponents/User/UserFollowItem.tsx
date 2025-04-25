"use client";
import { BasicUserDTO } from "@/types/User";
import React from "react";
import FollowButton from "../FollowButton/FollowButton";
import Link from "next/link";

interface UserFollowItemProps {
  user: BasicUserDTO;
}
const UserFollowItem = ({ user }:UserFollowItemProps) => {
  return (
    <div className="flex items-center justify-between ">
      <Link href={`/profile/${user.id}`} className="text-xl font-medium">{user.username}</Link>
      <FollowButton idUser={user.id} />
    </div>
  );
};
export default UserFollowItem;
