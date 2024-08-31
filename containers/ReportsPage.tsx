import React from "react";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/my_reports/loading";
// import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import MyReportsTable from "@/components/dashboard/MyReportsPage/MyReportsTable";

const getReports = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reports`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const getTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const ReportsPage = async () => {
  const data1 = getReports();
  const data2 = getTeachers();
  const data3: any = getServerSession(authOptions);

  const [reports, teachers, session] = await Promise.all([data1, data2, data3]);

  const teacher = teachers.data.find(
    (user: any) => user.email === session.user.email
  );

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />

      <Suspense fallback={<Loading />}>
        <MyReportsTable data={reports.data} teacher={teacher} />
      </Suspense>
    </div>
  );
};

export default ReportsPage;
