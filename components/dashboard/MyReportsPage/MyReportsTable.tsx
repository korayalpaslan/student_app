import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";

const StudentTable = ({ data, teacher, role }: any) => {
  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          My Reports
        </h4>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Reviewed By</TableHead>
            <TableHead>Report Period</TableHead>
            <TableHead className="text-center">Level</TableHead>
            <TableHead className="text-center">Class</TableHead>
            <TableHead className="text-center">Average Performance</TableHead>
            <TableHead className="text-center">View Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {role === "admin"
            ? data.map((report: any) => {
                return <TableRowComponent key={report._id} report={report} />;
              })
            : data
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
