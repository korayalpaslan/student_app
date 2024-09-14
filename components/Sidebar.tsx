"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Gauge,
  User,
  Users,
  GraduationCap,
  Star,
  BookText,
  FolderOpen,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <Command className="rounded-none min-h-[90vh] fixed top-[10vh] w-[300px] border-r-1">
      <CommandInput placeholder="Search menu tab" />
      <CommandList className="min-h-[90vh]">
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
        <CommandGroup heading="Essentials">
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard" && "bg-primary text-secondary-50"
              } `}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <Link href="/dashboard">Overview</Link>
            </div>
          </CommandItem>
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/students" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <Gauge className="mr-2 h-4 w-4" />
              <Link href="/dashboard/students">Performance List</Link>
            </div>
          </CommandItem>
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/create_review" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <Star className="mr-2 h-4 w-4" />
              <Link href="/dashboard/create_review">Create Review</Link>
            </div>
          </CommandItem>
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/create_report" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <BookText className="mr-2 h-4 w-4" />
              <Link href="/dashboard/create_report">Create Report</Link>
            </div>
          </CommandItem>
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/my_reports" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              <Link href="/dashboard/my_reports">My Reports</Link>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/teachers" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <User className="mr-2 h-4 w-4" />
              <Link href="/dashboard/teachers">Teacher List</Link>
            </div>
          </CommandItem>
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/student_list" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <Users className="mr-2 h-4 w-4" />
              <Link href="/dashboard/student_list">Student List</Link>
            </div>
          </CommandItem>
          <CommandItem>
            <div
              className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                pathname === "/dashboard/create_student" &&
                "bg-primary text-secondary-50"
              } `}
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              <Link href="/dashboard/create_student">Create New Student</Link>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
