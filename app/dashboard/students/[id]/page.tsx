import StudentDetailPage from "@/containers/StudentDetailPage";
export const dynamic = "force-dynamic";

const PostsPage = ({ params, searchParams }: any) => {
  return (
    <>
      <StudentDetailPage params={params} searchParams={searchParams} />
    </>
  );
};

export default PostsPage;
