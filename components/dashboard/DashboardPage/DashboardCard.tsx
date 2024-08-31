import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-gray-50 dark:bg-slate-800 p-4 pb-0 min-w-[250px]">
      <CardContent>
        <h3 className="text-base text-center mb-4 font-bold text-gray-700">
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center text-gray-700">
          {icon}
          <h3 className="text-xl font-semibold text-gray-700">{count}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
