import { TableCell, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import Link from "next/link";
const moment = require("moment");

const TableRowComponent = ({ report }: any) => {
  const options2: any = {
    day: "numeric",
    month: "long",
  };
  const average = (array: any) =>
    array.reduce((a: any, b: any) => a + b) / array.length;

  const toFixedIfNecessary = (value: any, dp: any) => {
    return +parseFloat(value).toFixed(dp);
  };

  const finalDate = moment(report.report_end_date).subtract(1, "day");

  return (
    <TableRow>
      <TableCell className="font-medium">
        {report.student[0].fullname}
      </TableCell>
      <TableCell className="font-medium">{report.teacher[0].name}</TableCell>
      <TableCell className="font-medium">
        {new Date(report.report_start_date).toLocaleDateString(
          "en-GB",
          options2
        )}{" "}
        - {new Date(finalDate).toLocaleDateString("en-GB", options2)}
      </TableCell>
      <TableCell className="font-medium  text-center">{report.level}</TableCell>
      <TableCell className="font-medium  text-center">{report.class}</TableCell>
      <TableCell className="font-medium text-center">
        {toFixedIfNecessary(average(report.performance), 1)}
      </TableCell>
      <TableCell className=" hidden md:flex justify-center">
        <Link href={`/dashboard/my_reports/${report._id}`}>
          <Eye size={20} />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
