import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/create_report/loading";
// import { headers } from "next/headers";
import MultiStepForm from "@/components/dashboard/CreateReportPage/MultiStepForm";

const getStudents = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/students`, {
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
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reviews`, {
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

const CreateReportPage = async () => {
  const data1 = getStudents();
  const data2 = getReviews();
  const data3: any = getServerSession(authOptions);
  const data4 = getTeachers();
  const [students, reviews, user, teachers] = await Promise.all([
    data1,
    data2,
    data3,
    data4,
  ]);

  const teacher = teachers.data.find(
    (teacher: any) => teacher.email === user.user.email
  );

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <MultiStepForm
          students={students}
          reviews={reviews}
          teacher={teacher._id}
        />
      </Suspense>
    </div>
  );
};

export default CreateReportPage;
