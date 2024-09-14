import React from "react";
import BackButton from "@/components/BackButton";
import Loading from "@/app/dashboard/students/[id]/loading";
import UpdateStudent from "@/components/dashboard/StudentListDetailPage/UpdateStudent";
import { headers } from "next/headers";
import { Suspense } from "react";

const getStudent = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/students/${id}`, {
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
