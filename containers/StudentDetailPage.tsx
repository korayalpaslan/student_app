import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import PerformanceListTable from "@/components/dashboard/StudentDetailsPage/PerformanceListTable";
import Analytics from "@/components/dashboard/StudentDetailsPage/Analytics";
import Loading from "@/app/dashboard/students/[id]/loading";
import { headers } from "next/headers";

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
const getReviews = async (query: string, page: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/reviews?query=${query}&page=${page}`,
      {
        method: "GET",
        headers: headers(),
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const StudentDetailPage = async ({ params, searchParams }: any) => {
  const page = Number(searchParams?.page) || 1;
  const data1 = getStudent(params.id);
  const data2 = getReviews(params.id, page);
  const [student, reviews]: any = await Promise.all([data1, data2]);

  const totalLength = reviews.allData
    .filter((item: any) => item.student[0]._id === student.data._id)
    .map((item: any) => item.level === item.student[0].level).length;

  return (
    <div>
      <BackButton text="Performance List" link="/dashboard/students" />
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {student.data.fullname} Performance Track
        </h4>
        <p className="text-sm text-muted-foreground lg:w-1/2 mt-2">
          Class: {student.data.class}
        </p>
        <p className="text-sm text-muted-foreground lg:w-1/2 mt-2">
          Level: {student.data.level}
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <Analytics data={reviews.data} />
        <PerformanceListTable
          data={reviews.data}
          totalLength={totalLength}
          pageNumber={page}
          studentId={student.data._id}
        />
      </Suspense>
    </div>
  );
};

export default StudentDetailPage;
