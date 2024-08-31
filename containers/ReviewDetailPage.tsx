import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import Loading from "@/app/dashboard/reviews/[id]/loading";
import PerformenceDetailTable from "@/components/dashboard/ReviewDetailPage/PerformanceDetailTable";
export const dynamic = "force-dynamic";

const getReview = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reviews/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const ReviewDetailPage = async ({ params }: any) => {
  const review = await getReview(params.id);

  const date = new Date(review.data.lesson_date).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BackButton
          text={`${review.data.student[0].fullname} Performance Track`}
          link={`/dashboard/students/${review.data.student[0]._id}`}
        />
        <div className="pb-4 mb-8">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {date} / Review Details
          </h4>
          <p className="text-sm text-muted-foreground lg:w-1/2 mt-4">
            Reviewed by: {review.data.teacher[0].name}
          </p>
        </div>
        <PerformenceDetailTable data={review} />
      </Suspense>
    </>
  );
};

export default ReviewDetailPage;
