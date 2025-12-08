import React from "react";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/students/loading";
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

const StudentsPage = async () => {
  const data1 = getStudents();
  const data2 = getReviews();
  const [students, reviews] = await Promise.all([data1, data2]);

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />

      <Suspense fallback={<Loading />}>
        <StudentTable data={students.data} reviews={reviews.data} />
      </Suspense>
      {/* <PostsPagination /> */}
    </div>
  );
};

export default StudentsPage;
