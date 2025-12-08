import React from "react";
import DashboardCard from "@/components/dashboard/DashboardPage/DashboardCard";
import { FolderOpen, BookOpenText, User, Users } from "lucide-react";

const DashboardHeader = ({ students, reports, reviews, teachers }: any) => {
  const realReviewsNumber = reviews.allData
    .filter((review: any) => review.isAttended === true)
    .filter((review: any) => {
      return review.level === review.student[0].level;
    }).length;

  const activeStudentNumber = students.data.length;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-5">
      <DashboardCard
        title="Number of Students"
        count={activeStudentNumber || 0}
        icon={
          <Users className="text-slate-500 dark:text-slate-200" size={32} />
        }
      />
      <DashboardCard
        title="Number of Reports"
        count={reports}
        icon={
          <FolderOpen
            className="text-slate-500 dark:text-slate-200"
            size={32}
          />
        }
      />
      <DashboardCard
        title="Number of Reviews"
        count={realReviewsNumber || 0}
        icon={
          <BookOpenText
            className="text-slate-500 dark:text-slate-200"
            size={32}
          />
        }
      />
      <DashboardCard
        title="Number of Teachers"
        count={teachers}
        icon={<User className="text-slate-500 dark:text-slate-200" size={32} />}
      />
    </div>
  );
};

export default DashboardHeader;
