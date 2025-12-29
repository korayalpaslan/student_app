import React from "react";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/my_reports/loading";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import MyReportsTable from "@/components/dashboard/MyReportsPage/MyReportsTable";

const getReports = async () => {
  const res = await fetch(`${process.env.API_URL}/api/reports`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("failed to fetch request");
  return res.json();
};

const ReportsPage = async () => {
  const data1 = getReports();
  const data2: any = getServerSession(authOptions);

  const [reports, session] = await Promise.all([data1, data2]);

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <MyReportsTable
          data={reports.data}
          teacher={session.user.id}
          role={session.user.role}
        />
      </Suspense>
    </div>
  );
};

export default ReportsPage;
