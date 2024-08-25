import StudentDetailPage from "@/containers/StudentDetailPage";

const PostsPage = ({ params }: any) => {
  return (
    <>
      <StudentDetailPage params={params} />
    </>
  );
};

export default PostsPage;
