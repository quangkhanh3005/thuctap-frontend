import { UserDTO } from "@/types/User";

interface UserRowProps {
  user: UserDTO;
  stt: number;
}
const UserRow = ({ user, stt }: UserRowProps) => {
  return (
    <tr key={user.id}>
      <td className="px-2 py-2 border text-center">{stt}</td>
      <td className="px-2 py-2 border">{user.username}</td>
      <td className="px-2 py-2 border">{user.email}</td>
      <td className="px-1 py-2 border text-center">
        {new Date(user.createAt).toLocaleString("vi-VN")}
      </td>
      <td className="px-2 py-2 border">
        {user.roles.map((role) => role.role).join(", ")}
      </td>
      <td className="px-2 py-2 border ">
        <div className="flex justify-center  space-x-3">
          <button className="py-2 px-3 bg-blue-600 text-white rounded">
            Xem Nhật Ký Hoạt Động
          </button>
          <button className="py-2 px-3 bg-amber-500 text-white rounded">
            Chỉnh Sửa Quyền
          </button>
        </div>
      </td>
    </tr>
  );
};
export default UserRow;
