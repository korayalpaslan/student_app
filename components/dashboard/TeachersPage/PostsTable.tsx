"use client";
import { useState, useContext } from "react";
import ModalContext from "@/context/ModalContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";
import { ChangeRoleModal } from "./ChangeRoleModal";

interface PostTableProps {
  data: any;
  role: string;
}

const PostsTable = ({ data, role }: PostTableProps) => {
  const [studentId, setStudentId] = useState(null);
  const ctx = useContext(ModalContext);

  return (
    <div className="mt-10">
      <div className="pb-4 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Registered Teacher List
        </h4>
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
              <TableRowComponent
                teacher={teacher}
                role={role}
                key={teacher._id}
                setStudentId={setStudentId}
              />
            );
          })}
        </TableBody>
      </Table>
      {ctx.toggleModal && <ChangeRoleModal id={studentId} />}
    </div>
  );
};

export default PostsTable;
