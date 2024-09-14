"use client";
import { useContext } from "react";
import ToggleContext from "@/context/ToggleContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/img/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Target, Menu } from "lucide-react";
interface UsernameProps {
  username: string;
}

const Navbar = ({ username }: UsernameProps) => {
  const ctx = useContext(ToggleContext);
  const title = username
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between items-center h-[10vh] fixed z-50 top-0 w-full">
      <Menu
        size={32}
        className="md:hidden"
        onClick={() => ctx.toggleMenuHandler()}
      />
      <Link href="/dashboard" className="font-bold text-4xl flex items-center">
        <Target size={32} /> <span className="ml-2 mb-2">stapp</span>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback className="text-black">{title}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
