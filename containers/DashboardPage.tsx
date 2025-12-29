import React from "react";
import { Suspense } from "react";
import Loading from "@/app/dashboard/loading";
import DashboardHeader from "@/components/dashboard/DashboardPage/DashboardHeader";
// import Analytics from "@/components/dashboard/DashboardPage/Analytics";
import OverviewTable from "@/components/dashboard/DashboardPage/OverviewTable";

const getStudents = async () => {
  try {
    const res = await fetch(`https://stapp-tau.vercel.app/api/students`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const getReviews = async () => {
  try {
    const res = await fetch(`https://stapp-tau.vercel.app/api/reviews`, {
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
    const res = await fetch(`https://stapp-tau.vercel.app/api/teachers`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};
const getReports = async () => {
  try {
    const res = await fetch(`https://stapp-tau.vercel.app/api/reports`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const DashboardPage = async () => {
  const data1 = getStudents();
  const data2 = getReviews();
  const data3 = getTeachers();
  const data4 = getReports();
  const [students, reviews, teachers, reports] = await Promise.all([
    data1,
    data2,
    data3,
    data4,
  ]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <DashboardHeader
          students={students}
          reports={reports.data.length}
          reviews={reviews}
          teachers={teachers.data.length}
        />
        <OverviewTable data={reviews.data} students={students.data} />
        {/* <Analytics data={reviews.data} /> */}
      </Suspense>
    </>
  );
};

export default DashboardPage;
