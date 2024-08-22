import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(authOptions);

  return (
    <main>
      <Navbar username={session.user.name} />
      <div className="flex">
        <div className="hidden xl:block w-[300px]">
          <Sidebar />
        </div>
        <div className="p-10 w-full xl:max-w-[1000px] mt-[10vh]">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
