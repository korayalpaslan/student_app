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

const CreateReviewPage = async () => {
  const data1 = getStudents();
  const data2: any = getServerSession(authOptions);
  const [students, session] = await Promise.all([data1, data2]);

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <CreateReview students={students} teacher_id={session.user.id} />
      </Suspense>
    </div>
  );
};

export default CreateReviewPage;
