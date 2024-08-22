"use client";
import BackButton from "@/components/BackButton";
import CreateStudent from "@/components/students/CreateStudent";
// import { useSession } from "next-auth/react";

const PostsPage = () => {
  // const { data: session } = useSession();
  // const user = session?.user?.name;

  return (
    <div>
      <BackButton text="Ana Sayfa" link="/dashboard" />
      <CreateStudent />
    </div>
  );
};

export default PostsPage;
