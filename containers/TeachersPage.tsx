import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import PostsTable from "@/components/dashboard/TeachersPage/PostsTable";
import Loading from "@/app/loading";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const getTeachers = async () => {
  const res = await fetch(`${process.env.API_URL}/api/teachers`, {
    method: "GET",
    headers: {
      cookie: cookies().toString(),
    },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("failed to fetch request");
  return res.json();
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
