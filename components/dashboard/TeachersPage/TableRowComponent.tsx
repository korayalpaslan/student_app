import React from "react";
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

const TableRowComponent = ({ teacher, role, setStudentId }: any) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{teacher.name}</TableCell>
      <TableCell className=" hidden md:table-cell">{teacher.email}</TableCell>
      {role === "admin" && (
        <>
          <TableCell className="font-medium flex justify-center">
            <Status
              isVerified={teacher.isVerified}
              id={teacher._id}
              setStudentId={setStudentId}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default TableRowComponent;
