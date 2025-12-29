import React from "react";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/students/loading";
import { cookies } from "next/headers";
import StudentTable from "@/components/dashboard/StudentsPage/StudentTable";

const getStudents = async () => {
  const res = await fetch(`${process.env.API_URL}/api/students`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("failed to fetch request");
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
  if (!res.ok) throw new Error("failed to fetch request");
  return res.json();
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
