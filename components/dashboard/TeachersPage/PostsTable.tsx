import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Status from "./Status";

interface PostTableProps {
  data: any;
  role: string;
}

const PostsTable = ({ data, role }: PostTableProps) => {
  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Registered Teacher List
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
            <TableHead>Teacher Name</TableHead>
            <TableHead className="hidden md:table-cell">E-mail</TableHead>
            {role === "admin" && (
              <TableHead className="text-center">Status</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((teacher: any) => {
            return (
              <TableRow key={teacher._id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell className=" hidden md:table-cell">
                  {teacher.email}
                </TableCell>
                {role === "admin" && (
                  <TableCell className="font-medium flex justify-center">
                    <Status isVerified={teacher.isVerified} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
