import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import BackButton from "@/components/BackButton";
import CreateReview from "@/components/dashboard/CreateReviewPage/CreateReview";
import { Suspense } from "react";
import Loading from "@/app/dashboard/create_review/loading";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

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

const CreateReviewPage = async () => {
  const students = getStudents();
  const teachers = getTeachers();
  const session: any = getServerSession(authOptions);

  const dataResponse = await Promise.all([students, teachers, session]);

  const teacher = dataResponse[1].data.find(
    (user: any) => user.email === dataResponse[2].user.email
  );
  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />

      <Suspense fallback={<Loading />}>
        <CreateReview students={dataResponse[0]} teacher_id={teacher._id} />
      </Suspense>
    </div>
  );
};

export default CreateReviewPage;
