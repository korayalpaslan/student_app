import { TableCell, TableRow } from "@/components/ui/table";
import { ListCollapse } from "lucide-react";
import Link from "next/link";

const TableRowComponent = ({ student, reviews }: any) => {
  if (reviews.length > 0) {
    const average = (array: any) =>
      array.reduce((a: any, b: any) => a + b, 0) / array.length;

    const studentReviews = reviews
      .filter((item: any) => item.level === student.level)
      .filter((item: any) => item.student[0]._id === student._id)
      .filter((item: any) => item.isAttended === true);

    let bigArray: any = [];
    studentReviews.forEach((element: any) => {
      return bigArray.push(element.criterias);
    });

    const toFixedIfNecessary = (value: any, dp: any) => {
      return +parseFloat(value).toFixed(dp);
    };

    return (
      <TableRow>
        <TableCell className="font-medium">{student.fullname}</TableCell>
        <TableCell className="hidden md:block font-medium text-center">
          {student.class}
        </TableCell>
        <TableCell className="font-medium text-center">
          {student.level}
        </TableCell>
        <TableCell className="font-medium text-center">
          {toFixedIfNecessary(average(bigArray.flat()).toFixed(2), 2) ||
            "No Reviews"}
        </TableCell>
        <TableCell className="text-center font-medium">
          <Link href={`/dashboard/students/${student._id}`}>
            <ListCollapse size={20} className="mx-auto" />
          </Link>
        </TableCell>
      </TableRow>
    );
  }
};

export default TableRowComponent;
