import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import BackButton from "@/components/BackButton";
import { Suspense } from "react";
import Loading from "@/app/dashboard/create_report/loading";
import { cookies } from "next/headers";
import MultiStepForm from "@/components/dashboard/CreateReportPage/MultiStepForm";

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
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};

const CreateReportPage = async () => {
  const data1 = getStudents();
  const data2 = getReviews();
  const data3: any = getServerSession(authOptions);
  const [students, reviews, session] = await Promise.all([data1, data2, data3]);

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <MultiStepForm
          students={students}
          reviews={reviews}
          teacher={session.user.id}
        />
      </Suspense>
    </div>
  );
};

export default CreateReportPage;
