"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ListCollapse } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const moment = require("moment");

const PerformenceListTable = ({ data, totalLength, pageNumber }: any) => {
  //// PAGINATION
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const page: number = Number(searchParams.get("page")) || 1;
  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 5;
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < 0;

  const handleChangePage = (type: any) => {
    type === "prev"
      ? params.set("page", String(page - 1))
      : params.set("page", String(page + 1));
    push(`${pathname}?${params}`);
  };
  const totalPages = Math.ceil(totalLength / 5);

  /////
  const average = (array: any) =>
    array.reduce((a: any, b: any) => a + b) / array.length;

  return (
    <div>
      <div className="mt-10">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson Date</TableHead>
              <TableHead className="text-center">Average Rate</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .filter((item: any) => item.level === item.student[0].level)
              .map((review: any) => {
                const date = new Date(review.lesson_date).toLocaleDateString(
                  "en-EN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );

                return (
                  <TableRow key={review._id}>
                    <TableCell className="font-medium">{date}</TableCell>
                    <TableCell className="font-medium text-center">
                      {review.isAttended
                        ? average(review.criterias)
                        : "Not Attended"}
                    </TableCell>
                    <TableCell className="font-medium flex justify-center">
                      {review.isAttended ? (
                        <Link href={`/dashboard/reviews/${review._id}`}>
                          <ListCollapse size={16} />
                        </Link>
                      ) : (
                        " "
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            {pageNumber > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handleChangePage("prev")}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}

            {totalPages !== 1 &&
              Array.from({ length: totalPages ?? 1 }).map((_, index) => {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`/dashboard/students/66ca422d03905c8aa8c4ac6b?page=${
                        index + 1
                      }`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            {pageNumber < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => handleChangePage("next")}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PerformenceListTable;
