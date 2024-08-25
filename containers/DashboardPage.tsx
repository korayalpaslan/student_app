import React from "react";
import DashboardCard from "@/components/dashboard/DashboardPage/DashboardCard";
import { Newspaper } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex justify-center gap-5 mb-5">
      <DashboardCard
        title="Posts"
        count={100}
        icon={
          <Newspaper className="text-slate-500 dark:text-slate-200" size={32} />
        }
      />
      <DashboardCard
        title="Users"
        count={200}
        icon={
          <Newspaper className="text-slate-500 dark:text-slate-200" size={32} />
        }
      />
      <DashboardCard
        title="Categories"
        count={300}
        icon={
          <Newspaper className="text-slate-500 dark:text-slate-200" size={32} />
        }
      />
      <DashboardCard
        title="Comments"
        count={400}
        icon={
          <Newspaper className="text-slate-500 dark:text-slate-200" size={32} />
        }
      />
    </div>
  );
};

export default DashboardPage;
