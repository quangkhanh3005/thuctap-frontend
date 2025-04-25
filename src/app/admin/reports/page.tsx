"use client";

import { ReportDTO } from "@/types/Report";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import ReportAdminCard from "./ReportAdminCard";
import { useRouter } from "next/navigation";

const AdminReportPage = () => {
  const [reports, setReports] = useState<ReportDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    if (!tokenSession) {
      return;
    }
    setToken(tokenSession);
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URLAPI}/report/admin`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        console.log(response.data);
        setReports(response.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.status === 403) {
          alert("Bạn không có quyền truy cập!");
          router.push("/");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);
  if (loading) {
  }
  if (loading) {
    return <div>Đang tải dữ liệu ...</div>;
  }
  const approveReport = async (id: number) => {
    try {
      await axios.put(
        `${URLAPI}/report/admin/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Báo cáo đã được duyệt!");
      setReports(reports.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const rejectReport = async (id: number) => {
    try {
      await axios.put(
        `${URLAPI}/report/admin/reject/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Báo cáo đã được từ chối!");
      setReports(reports.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4 text-center bg-white p-4 rounded shadow-lg">
        Duyệt Báo Cáo
      </h1>
      {reports.length > 0 ? (
        reports.map((report) => (
          <div className="bg-white p-4 mt-5 space-y-4 shadow-md rounded-xl" key={report.id}>
            <ReportAdminCard report={report} />
            <div className="flex justify-center space-x-5 mt-4">
              <button
                onClick={() => approveReport(report.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
              >
                Duyệt
              </button>
              <button
                onClick={() => rejectReport(report.id)}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
              >
                Từ Chối
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>Không có bài báo cáo nào!</div>
      )}
    </div>
  );
};
export default AdminReportPage;
