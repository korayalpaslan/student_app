"use client";
import { useContext } from "react";
import ToggleContext from "@/context/ToggleContext";
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
  Folders,
  CreditCard,
  Settings,
  User,
  Users,
  GraduationCap,
  Star,
  BookText,
  FolderOpen,
} from "lucide-react";
const MobileMenu = () => {
  const pathname = usePathname();
  const ctx = useContext(ToggleContext);

  const closeMenu = () => {
    setTimeout(() => {
      ctx.toggleMenuHandler();
    }, 500);
  };

  return (
    <div
      className={`fixed z-50 h-[90vh] md:hidden bg-primary  flex justify-center items-center w-full transition-all duration-300 ease-in-out ${
        ctx.toggleMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Command className="rounded-none w-full border-r-1 bg-primary  p-6">
        {/* <CommandInput placeholder="Search menu tab" /> */}
        <CommandList className="min-h-[90vh]">
          {/* <CommandEmpty>Sonuç bulunamadı.</CommandEmpty> */}
          <CommandGroup heading="Essentials">
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                  pathname === "/dashboard"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <Link href="/dashboard" onClick={closeMenu}>
                  Overview
                </Link>
              </div>
            </CommandItem>
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                  pathname === "/dashboard/students"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <Gauge className="mr-2 h-4 w-4" />
                <Link href="/dashboard/students" onClick={closeMenu}>
                  Performance List
                </Link>
              </div>
            </CommandItem>
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md  ${
                  pathname === "/dashboard/create_review"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <Star className="mr-2 h-4 w-4" />
                <Link href="/dashboard/create_review" onClick={closeMenu}>
                  Create Review
                </Link>
              </div>
            </CommandItem>
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                  pathname === "/dashboard/create_report"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <BookText className="mr-2 h-4 w-4" />
                <Link href="/dashboard/create_report" onClick={closeMenu}>
                  Create Report
                </Link>
              </div>
            </CommandItem>
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                  pathname === "/dashboard/my_reports"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                <Link href="/dashboard/my_reports" onClick={closeMenu}>
                  My Reports
                </Link>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md  ${
                  pathname === "/dashboard/teachers"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <User className="mr-2 h-4 w-4" />
                <Link href="/dashboard/teachers" onClick={closeMenu}>
                  Teacher List
                </Link>
              </div>
            </CommandItem>
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md  ${
                  pathname === "/dashboard/student_list"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <Users className="mr-2 h-4 w-4" />
                <Link href="/dashboard/student_list" onClick={closeMenu}>
                  Student List
                </Link>
              </div>
            </CommandItem>
            <CommandItem>
              <div
                className={`flex items-center w-full h-full px-2 py-2.5 rounded-md ${
                  pathname === "/dashboard/create_student"
                    ? "bg-secondary text-gray-950"
                    : "text-white"
                } `}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <Link href="/dashboard/create_student" onClick={closeMenu}>
                  Create New Student
                </Link>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default MobileMenu;
