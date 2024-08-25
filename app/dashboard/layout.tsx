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
        <div className="hidden xl:block mt-[10vh] w-[300px] h-[90vh]">
          <Sidebar />
        </div>
        <div className="p-10 grow mt-[10vh] max-w-[1000px] mx-auto">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
