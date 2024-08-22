import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default HomePage;
