import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PerformenceDetailTable = ({ data }: any) => {
  return (
    <div className="mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Review Criterias</TableHead>
            <TableHead className="text-center">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              Eagerly participates in class activities
            </TableCell>
            <TableCell className="font-medium text-center">
              {data.data.criteria_one}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Tackles challenges with hard work and determination
            </TableCell>
            <TableCell className="font-medium text-center">
              {data.data.criteria_two}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Keeps a positive outlook in every situation.
            </TableCell>
            <TableCell className="font-medium text-center">
              {data.data.criteria_three}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Displays independence when completing tasks
            </TableCell>
            <TableCell className="font-medium text-center">
              {data.data.criteria_three}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PerformenceDetailTable;
