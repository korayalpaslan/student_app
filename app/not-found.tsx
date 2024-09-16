import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-7xl mb-4 font-extrabold">404</h2>
      <p className=" mb-4">
        Sorry 😔, We could not find the requested resource @{" "}
        <strong>stapp</strong>
      </p>
      <BackButton text="Return Home" link="/dashboard" />
    </div>
  );
}
