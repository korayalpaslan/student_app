import BackButton from "@/components/BackButton";
import CreateStudent from "@/components/dashboard/CreateStudentPage/CreateStudent";
import Loading from "@/app/dashboard/create_student/loading";
import { Suspense } from "react";

const CreateStudentPage = () => {
  return (
    <div>
      <BackButton text="Overview" link="/dashboard" />
      <Suspense fallback={<Loading />}>
        <CreateStudent />
      </Suspense>
    </div>
  );
};

export default CreateStudentPage;
