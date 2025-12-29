import React from "react";
import BackButton from "@/components/BackButton";
import Loading from "@/app/dashboard/students/[id]/loading";
import UpdateStudent from "@/components/dashboard/StudentListDetailPage/UpdateStudent";
import { cookies } from "next/headers";
import { Suspense } from "react";

const getStudent = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/students/${id}`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("failed to fetch request");
  return res.json();
};
const StudentListDetailPage = async ({ params }: any) => {
  const data = await getStudent(params.id);

  return (
    <div>
      <BackButton text="Student List" link="/dashboard/student_list" />
      <Suspense fallback={<Loading />}>
        <UpdateStudent student={data.data} />
      </Suspense>
    </div>
  );
};

export default StudentListDetailPage;
