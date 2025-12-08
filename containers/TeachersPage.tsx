import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import PostsTable from "@/components/dashboard/TeachersPage/PostsTable";
import Loading from "@/app/loading";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const getTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers`, {
      method: "GET",
      headers: headers(),
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

export const TeachersPage = async () => {
  const data1 = getTeachers();
  const data2: any = getServerSession(authOptions);
  const [teachers, session] = await Promise.all([data1, data2]);

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <PostsTable data={teachers.data} role={session.user.role} />
      </Suspense>
    </div>
  );
};
