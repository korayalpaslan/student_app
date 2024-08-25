import React from "react";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { headers } from "next/headers";
import StudentTable from "@/components/dashboard/StudentsPage/StudentTable";

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

const StudentsPage = async () => {
  const students = await getStudents();

  return (
    <div>
      <BackButton text="Ana Sayfa" link="/dashboard" />

      <Suspense fallback={<Loading />}>
        <StudentTable data={students.data} />
      </Suspense>
      {/* <PostsPagination /> */}
    </div>
  );
};

export default StudentsPage;
