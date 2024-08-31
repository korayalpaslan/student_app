import { TableCell, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import Link from "next/link";

const TableRowComponent = ({ report }: any) => {
  const options2: any = {
    year: "numeric",
    month: "long",
  };
  const average = (array: any) =>
    array.reduce((a: any, b: any) => a + b) / array.length;

  return (
    <TableRow>
      <TableCell className="font-medium">
        {report.student[0].fullname}
      </TableCell>
      <TableCell className="font-medium">{report.teacher[0].name}</TableCell>
      <TableCell className="font-medium text-center">
        {new Date(report.report_period).toLocaleDateString("en-EN", options2)}
      </TableCell>
      <TableCell className="font-medium  text-center">{report.level}</TableCell>
      <TableCell className="font-medium  text-center">{report.class}</TableCell>
      <TableCell className="font-medium text-center">
        {average(report.performance)}
      </TableCell>
      <TableCell className=" hidden md:flex justify-center">
        <Link href={`/dashboard/students`}>
          <Eye size={20} />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
