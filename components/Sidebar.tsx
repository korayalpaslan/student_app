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
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
  GraduationCap,
  Star,
} from "lucide-react";

const Sidebar = () => {
  return (
    <Command className="bg-gray-50 rounded-none min-h-[90vh] fixed top-[10vh] w-[300px]">
      <CommandInput placeholder="Aradığınız menü adını yazın" />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
        <CommandGroup heading="Sık Kullanılanlar">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href="/dashboard">Genel Bakış</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="/dashboard/students">Performans Tablosu</Link>
          </CommandItem>
          <CommandItem>
            <Star className="mr-2 h-4 w-4" />
            <Link href="/dashboard/create_review">Değerlendirme Oluştur</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Kayıt İşlemleri">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/dashboard/create_teacher">Yeni Öğretmen Kaydı</Link>
          </CommandItem>
          <CommandItem>
            <GraduationCap className="mr-2 h-4 w-4" />
            <Link href="/dashboard/create_student">Yeni Öğrenci Kaydı</Link>
          </CommandItem>
          {/* <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem> */}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
