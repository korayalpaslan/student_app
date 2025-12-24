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
    <>
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
                Participation & Engagement{" "}
              </TableCell>
              <TableCell className="font-medium text-center">
                {data.data.criterias[0]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fluency </TableCell>
              <TableCell className="font-medium text-center">
                {data.data.criterias[1]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Pronunciation & Clarity{" "}
              </TableCell>
              <TableCell className="font-medium text-center">
                {data.data.criterias[2]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Vocabulary Use </TableCell>
              <TableCell className="font-medium text-center">
                {data.data.criterias[3]}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Listening & Comprehension{" "}
              </TableCell>
              <TableCell className="font-medium text-center">
                {data.data.criterias[4]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-8">
        <h4 className="scroll-m-20 text-sm text-muted-foreground tracking-tight  border-b pb-4 px-4  border-b-gray-200">
          Teacher Comment
        </h4>
        <p className="text-sm mt-4 px-4">{data.data.comment}</p>
      </div>
    </>
  );
};

export default PerformenceDetailTable;
