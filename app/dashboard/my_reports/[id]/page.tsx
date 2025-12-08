import ReportDetailPage from "@/containers/ReportDetailPage";
export const dynamic = "force-dynamic";

const ReportDetail = ({ params }: any) => {
  return (
    <>
      <ReportDetailPage params={params} />
    </>
  );
};

export default ReportDetail;
