import DashboardCard from "@/components/dashboard/DashboardCard";
import PostsTable from "@/components/students_list/PostsTable";
import { Newspaper } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5 ">
        <DashboardCard
          title="Posts"
          count={100}
          icon={
            <Newspaper
              className="text-slate-500 dark:text-slate-200"
              size={32}
            />
          }
        />
        <DashboardCard
          title="Users"
          count={200}
          icon={
            <Newspaper
              className="text-slate-500 dark:text-slate-200"
              size={32}
            />
          }
        />
        <DashboardCard
          title="Categories"
          count={300}
          icon={
            <Newspaper
              className="text-slate-500 dark:text-slate-200"
              size={32}
            />
          }
        />
        <DashboardCard
          title="Comments"
          count={400}
          icon={
            <Newspaper
              className="text-slate-500 dark:text-slate-200"
              size={32}
            />
          }
        />
      </div>
    </>
  );
}
