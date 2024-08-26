import React from "react";
import DashboardCard from "@/components/dashboard/DashboardPage/DashboardCard";
import { GraduationCap, TrendingUp, BookOpenText, Users } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex justify-center gap-5 mb-5">
      <DashboardCard
        title="Kayıtlı Öğrenci"
        count={28}
        icon={
          <GraduationCap
            className="text-slate-500 dark:text-slate-200"
            size={32}
          />
        }
      />
      <DashboardCard
        title="Kayıtlı Öğretmen"
        count={6}
        icon={
          <Users className="text-slate-500 dark:text-slate-200" size={32} />
        }
      />
      <DashboardCard
        title="Gerçekleşen Ders"
        count={89}
        icon={
          <BookOpenText
            className="text-slate-500 dark:text-slate-200"
            size={32}
          />
        }
      />
      <DashboardCard
        title="Başarı Ortalaması"
        count={2.8}
        icon={
          <TrendingUp
            className="text-slate-500 dark:text-slate-200"
            size={32}
          />
        }
      />
    </div>
  );
};

export default DashboardPage;
