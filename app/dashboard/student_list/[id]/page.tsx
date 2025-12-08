import StudentListDetailPage from "@/containers/StudentListDetailPage";
export const dynamic = "force-dynamic";

const StudentDetailPage = ({ params }: any) => {
  return (
    <>
      <StudentListDetailPage params={params} />
    </>
  );
};

export default StudentDetailPage;
