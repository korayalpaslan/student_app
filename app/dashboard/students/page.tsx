import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import PostsPagination from "@/components/students_list/PostsPagination";
import PostsTable from "@/components/students_list/PostsTable";
import Loading from "./loading";

const getStudents = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/students`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const PostsPage = async () => {
  const students = await getStudents();

  return (
    <div>
      <BackButton text="Ana Sayfa" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <PostsTable data={students.data} />
      </Suspense>
      {/* <PostsPagination /> */}
    </div>
  );
};

export default PostsPage;
