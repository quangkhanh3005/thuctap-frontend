"use client";

import { ReportDTO } from "@/types/Report";
import axios from "axios";
import { useEffect, useState } from "react";
import URLAPI from "../../../../config";
import ReportUserItem from "@/components/UserComponents/Report/ReportUserItem";

const ReportPage = () => {
  const [reports, setReports] = useState<ReportDTO[]>([]);
  const [loading, SetLoading] = useState(false);
  useEffect(() => {
    const tokenSession = sessionStorage.getItem("token");
    const fetchReport = async () => {
      try {
        SetLoading(true);
        const response = await axios.get(`${URLAPI}/report/user`, {
          headers: { Authorization: `Bearer ${tokenSession}` },
        });
        console.log(response.data)
        setReports(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        SetLoading(false);
      }
    };
    fetchReport();
  }, []);
  if (loading) {
    return <div className="text-center">Đang tải dữ liệu ....</div>;
  }
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center bg-white rounded shadow p-4">Danh Sách Các Báo Cáo Bạn Gửi</h1>
      {reports.length > 0 ? (
        reports.map((report) => (
          <ReportUserItem key={report.id} report={report} />
        ))
      ) : (
        <div className="text-center mt-4">Bạn chưa gửi bài báo cáo nào</div>
      )}
    </div>
  );
};
export default ReportPage;
