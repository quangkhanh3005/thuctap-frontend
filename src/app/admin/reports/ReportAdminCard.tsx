import PostCard from "@/components/UserComponents/Post/PostCard";
import { ReportDTO } from "@/types/Report";
import Link from "next/link";

interface ReportAdminCardProps {
  report: ReportDTO;
}
const ReportAdminCard = ({ report }: ReportAdminCardProps) => {
  return (
    <div className="space-y-3" key={report.id}>
      {report.post && (
        <div className="p-4 space-y-2">
          <h2 className="text-lg font-medium text-center">Báo Cáo Bài Viết</h2>
          <div className="border">
            <PostCard post={report.post} />
          </div>
        </div>
      )}
      {report.comment && (
        <div>
          <h2 className="text-lg font-medium text-center">Báo Cáo Bình Luận</h2>
          <div className="border mt-4">
            <div className="p-2">
              <div className="flex gap-x-4 items-center">
                <div className="text-lg font-semibold">
                  {report.comment.user.username}
                </div>
                <div className="text-gray-500">
                  {new Date(report.comment.createdAt).toLocaleString("vi-VN")}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border border-black my-4">
                {report.comment.content}
              </div>
            </div>
          </div>
        </div>
      )}
      {report.userReported && (
        <div>
          <h2 className="text-lg font-medium text-center">
            Báo Cáo Người Dùng
          </h2>
          <div className="border mt-4">
            <div className="p-2">
              <div className="flex gap-x-4 items-center">
                <p>Tên tài khoản bị báo cáo:</p>
                <div className="text-lg font-semibold">
                  <Link href={`/profile/${report.userReported.id}`}>
                    {report.userReported.username}{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="space-x-3 my-4">
            <span>Xem nhật ký hoạt động:</span>
            <Link href={"/"}>
            <button className="px-4 py-2 bg-green-500 rounded cursor-pointer text-white">Xem nhật ký</button>
            </Link>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <p>Người báo cáo:</p>
          <p className="text-lg font-semibold">{report.user.username}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <p>Thời gian báo cáo:</p>
          <p>{new Date(report.createdAt).toLocaleString("vi-VN")}</p>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-lg">Lý do báo cáo:</h3>
        <div className="bg-gray-100 p-3 rounded-md border border-black italic">
          {report.reason}
        </div>
      </div>
    </div>
  );
};
export default ReportAdminCard;
