import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Search } from "lucide-react";
const moment = require("moment");

const PerformenceListTable = ({ data }: any) => {
  const average = (array: any) =>
    array.reduce((a: any, b: any) => a + b) / array.length;

  return (
    <div>
      <div className="mt-10">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson Date</TableHead>
              <TableHead className="text-center">Average Rate</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((review: any) => {
              const date = new Date(review.lesson_date).toLocaleDateString(
                "tr-TR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              return (
                <TableRow key={review._id}>
                  <TableCell className="font-medium">{date}</TableCell>
                  <TableCell className="font-medium text-center">
                    {average(review.criterias)}
                  </TableCell>
                  {/* <TableCell className=" hidden md:table-cell text-center">
                  {student.level}
                </TableCell> */}
                  <TableCell className="font-medium flex justify-center">
                    <Link href={`/dashboard/reviews/${review._id}`}>
                      <Search size={16} />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PerformenceListTable;
