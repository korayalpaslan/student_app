import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";

const StudentTable = ({ data }: any) => {
  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Student List
        </h4>
        <p className="text-sm text-muted-foreground lg:w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit
          malesuada ex eleifend sodales. Ut semper congue ultricies. Aenean elit
          lorem, pharetra et blandit ac, convallis eu augue. Ut suscipit lacus
          nec velit aliquet.
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-center">Class</TableHead>
            <TableHead className="text-center">Level</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Details
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student: any) => {
            return (
              <TableRow key={student._id}>
                <TableCell className="font-medium">
                  {student.fullname}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {student.class}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {student.level}
                </TableCell>
                <TableCell className=" hidden md:flex justify-center">
                  <Link href={`/dashboard/students/${student._id}`}>
                    <Search size={20} />
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
