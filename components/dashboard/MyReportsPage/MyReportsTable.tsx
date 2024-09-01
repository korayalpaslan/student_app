import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";

const StudentTable = ({ data, teacher }: any) => {
  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          My Reports
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
            <TableHead>Student</TableHead>
            <TableHead>Reviewed By</TableHead>
            <TableHead className="text-center">Month</TableHead>
            <TableHead className="text-center">Level</TableHead>
            <TableHead className="text-center">Class</TableHead>
            <TableHead className="text-center">Average Performance</TableHead>
            <TableHead className="text-center">View Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            .filter((item: any) => item.teacher[0]._id === teacher)
            .map((report: any) => {
              return <TableRowComponent key={report._id} report={report} />;
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
