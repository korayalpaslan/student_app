import StudentDetailPage from "@/containers/StudentDetailPage";
export const dynamic = "force-dynamic";

const PostsPage = ({ params }: any) => {
  return (
    <>
      <StudentDetailPage params={params} />
    </>
  );
};

export default PostsPage;
