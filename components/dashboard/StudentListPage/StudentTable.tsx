import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, ListCollapse } from "lucide-react";
import Link from "next/link";
const moment = require("moment");

interface PostTableProps {
  data: any;
}

const StudentTable = ({ data }: PostTableProps) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Student List
        </h4>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-center">Class</TableHead>
            <TableHead className="text-center">Level</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead className="font-medium text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student: any) => {
            return (
              <TableRow key={student._id}>
                <TableCell className="font-medium">
                  {student.fullname}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {student.class}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {student.level}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(
                    moment(student.birth_date).subtract(1, "day").format()
                  ).toLocaleDateString("en-EN", options)}
                </TableCell>
                <TableCell className="text-center font-medium">
                  <Link href={`/dashboard/student_list/${student._id}`}>
                    <Pencil size={16} className="mx-auto" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
