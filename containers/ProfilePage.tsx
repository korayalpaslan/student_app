import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import Loading from "@/app/loading";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import TeacherProfile from "@/components/dashboard/ProfilePage/TeacherProfile";

const getTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/teachers`, {
      method: "GET",
      headers: headers(),
      cache: "force-cache",
    });
    if (!res.ok) throw new Error("failed to fetch request");
    return res.json();
  } catch (error) {
    console.log("Error loading events", error);
  }
};

const ProfilePage = async () => {
  const data1 = getTeachers();
  const data2: any = getServerSession(authOptions);
  const [teachers, session] = await Promise.all([data1, data2]);

  const teacher = teachers.data.find(
    (teacher: any) => teacher._id === session.user.id
  );

  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <TeacherProfile teacher={teacher} />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
