import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import PostsTable from "@/components/dashboard/TeachersPage/PostsTable";
import Loading from "@/app/loading";
// import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const getTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers`, {
      method: "GET",
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

export const TeachersPage = async () => {
  const teachers = getTeachers();
  const session: any = getServerSession(authOptions);
  const dataResponse = await Promise.all([teachers, session]);

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <PostsTable
          data={dataResponse[0].data}
          role={dataResponse[1].user.role}
        />
      </Suspense>
    </div>
  );
};
