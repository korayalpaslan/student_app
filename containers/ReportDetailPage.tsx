import React from "react";
import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import Loading from "@/app/dashboard/my_reports/[id]/loading";
import { headers } from "next/headers";
import ReportDetails from "@/components/dashboard/ReportDetailPage/ReportDetails";

const getReport = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reports/${id}`, {
      method: "GET",
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const ReportDetailPage = async ({ params }: any) => {
  const report = await getReport(params.id);

  return (
    <div>
      <BackButton text="My Reports" link="/dashboard/my_reports" />
      <Suspense fallback={<Loading />}>
        <ReportDetails report={report.data} />
      </Suspense>
    </div>
  );
};

export default ReportDetailPage;
