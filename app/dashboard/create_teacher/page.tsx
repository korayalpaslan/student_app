"use client";
import BackButton from "@/components/BackButton";
import CreateTeacher from "@/components/teachers/CreateTeacher";
// import { useSession } from "next-auth/react";

const PostsPage = () => {
  // const { data: session } = useSession();
  // const user = session?.user?.name;

  return (
    <div>
      <BackButton text="Ana Sayfa" link="/dashboard" />
      <CreateTeacher />
    </div>
  );
};

export default PostsPage;
