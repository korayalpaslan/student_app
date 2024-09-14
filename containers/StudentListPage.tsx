import React from "react";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/students/loading";
import { headers } from "next/headers";
import StudentTable from "@/components/dashboard/StudentListPage/StudentTable";

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

const StudentListPage = async () => {
  const data = await getStudents();

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <StudentTable data={data.data} />
      </Suspense>
    </div>
  );
};

export default StudentListPage;
