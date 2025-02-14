import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { filter } from "lodash";
import { Pencil, ListCollapse } from "lucide-react";
import Link from "next/link";
const moment = require("moment");

interface PostTableProps {
  data: any;
  students: any;
}

const OverviewTable = ({ data, students }: PostTableProps) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const levels = ["A1+", "A2", "A2+", "B1", "B1+", "B2"];

  const filteredData = data
    // .filter((review: any) => {
    //   return review.student[0].isActive === true;
    // })
    .filter((review: any) => {
      return review.level === review.student[0].level;
    });

  const numberOfActiveReviews = (array: any, level: any) => {
    return array.filter((item: any) => item.level === level);
  };

  const numberOfActiveStudents = (array: any, level: string) => {
    return array.filter((item: any) => item.level === level);
  };

  const reviewAverage = (array: any, level: string) => {
    const filtered = array.filter((item: any) => item.level === level);

    if (filtered.length > 0) {
      const flattenedArray = filtered
        .map((review: any) => review.criterias)
        .flat();
      return (
        flattenedArray.reduce((a: any, b: any) => a + b) / flattenedArray.length
      );
    } else {
      return null;
    }
  };

  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Overview List
        </h4>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Level</TableHead>
            <TableHead className="text-center">
              Number of Active Students
            </TableHead>
            <TableHead className="text-center">
              Number of Active Reviews
            </TableHead>
            <TableHead className="text-center">Review Average</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {levels.map((level: any) => {
            return (
              <TableRow key={level}>
                <TableCell className="font-medium">{level}</TableCell>
                <TableCell className="font-medium md:table-cell text-center">
                  {numberOfActiveStudents(students, level).length || 0}
                </TableCell>
                <TableCell className="font-medium md:table-cell text-center">
                  {numberOfActiveReviews(filteredData, level).length || 0}
                </TableCell>
                <TableCell className="font-medium md:table-cell text-center">
                  {reviewAverage(filteredData, level)?.toFixed(2) ||
                    "Not available"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OverviewTable;
