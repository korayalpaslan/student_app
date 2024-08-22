import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackButton from "@/components/BackButton";
import CreateReview from "@/components/reviews/CreateReview";

const getStudents = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/students`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const getTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers`, {
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
  const teachers = await getTeachers();
  const session: any = await getServerSession(authOptions);

  const dataResponse = await Promise.all([students, teachers, session]);

  const teacher = dataResponse[1].data.find(
    (user: any) => user.email === dataResponse[2].user.email
  );

  return (
    <div>
      <BackButton text="Ana Sayfa" link="/dashboard" />
      <CreateReview data={dataResponse[0]} teacher_id={teacher._id} />
    </div>
  );
};

export default PostsPage;
