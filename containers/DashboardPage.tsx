import React from "react";
import { headers } from "next/headers";
import { Suspense } from "react";
import Loading from "@/app/dashboard/loading";
import DashboardHeader from "@/components/dashboard/DashboardPage/DashboardHeader";
import Analytics from "@/components/dashboard/DashboardPage/Analytics";

const getStudents = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/students`, {
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

const getReviews = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reviews`, {
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

const getTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers`, {
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
const getReports = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reports`, {
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
          student={students.data.length}
          reports={reports.data.length}
          reviews={reviews}
          teachers={teachers.data.length}
        />
        <Analytics data={reviews.data} />
      </Suspense>
    </>
  );
};

export default DashboardPage;
