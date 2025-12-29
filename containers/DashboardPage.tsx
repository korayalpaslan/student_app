import React from "react";
import { Suspense } from "react";
import { cookies } from "next/headers";
import Loading from "@/app/dashboard/loading";
import DashboardHeader from "@/components/dashboard/DashboardPage/DashboardHeader";
// import Analytics from "@/components/dashboard/DashboardPage/Analytics";
import OverviewTable from "@/components/dashboard/DashboardPage/OverviewTable";

const getStudents = async () => {
  const res = await fetch(`${process.env.API_URL}/api/students`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }
  return res.json();
};

const getReviews = async () => {
  const res = await fetch(`${process.env.API_URL}/api/reviews`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};

const getTeachers = async () => {
  const res = await fetch(`${process.env.API_URL}/api/teachers`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch teachers");
  }
  return res.json();
};
const getReports = async () => {
  const res = await fetch(`${process.env.API_URL}/api/reports`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }
  return res.json();
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
