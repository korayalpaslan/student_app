import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import PerformanceListTable from "@/components/performance/PerformanceListTable";
import Loading from "./loading";
import Analytics from "@/components/performance/Analytics";

const getStudent = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/students/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};
const getReviews = async (query: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/reviews?query=${query}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const StudentDetail = async ({ params }: any) => {
  const student = await getStudent(params.id);
  const reviews = await getReviews(params.id);

  return (
    <div>
      <BackButton text="Performans Tablosu" link="/dashboard/students" />
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {student.data.fullname} Performans Tablosu
        </h4>
        <p className="text-sm text-muted-foreground lg:w-1/2 mt-2">
          Sınıfı: {student.data.class}
        </p>
        <p className="text-sm text-muted-foreground lg:w-1/2 mt-2">
          İngilizce Düzeyi: {student.data.level}
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <Analytics data={reviews.data} />
        <PerformanceListTable data={reviews.data} />
      </Suspense>
    </div>
  );
};

export default StudentDetail;
