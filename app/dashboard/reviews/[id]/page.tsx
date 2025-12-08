import ReviewDetailPage from "@/containers/ReviewDetailPage";
export const dynamic = "force-dynamic";

const ReviewDetail = async ({ params }: any) => {
  return (
    <>
      <ReviewDetailPage params={params} />
    </>
  );
};

export default ReviewDetail;
