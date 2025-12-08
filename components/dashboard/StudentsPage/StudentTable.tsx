import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";

const StudentTable = ({ data, reviews }: any) => {
  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Performance List
        </h4>
        {/* <p className="text-sm text-muted-foreground lg:w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit
          malesuada ex eleifend sodales. Ut semper congue ultricies. Aenean elit
          lorem, pharetra et blandit ac, convallis eu augue. Ut suscipit lacus
          nec velit aliquet.
        </p> */}
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Class
            </TableHead>
            <TableHead className="text-center">Level</TableHead>
            <TableHead className="text-center">Average</TableHead>
            <TableHead className="text-center">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student: any) => {
            return (
              <TableRowComponent
                key={student._id}
                student={student}
                reviews={reviews.filter(
                  (review: any) => review.student[0]._id === student._id
                )}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
