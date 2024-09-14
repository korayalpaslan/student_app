"use client";
import ModalContext from "@/context/ModalContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export function ChangeRoleModal({ id }: any) {
  const ctx = useContext(ModalContext);

  const closeModal = () => {
    window.location.href = "/dashboard/teachers";
  };

  const changeTeacherRoleHandler = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/teachers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: true }),
      });
      if (res.ok) {
        window.location.href = "/dashboard/teachers";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed h-screen w-full bg-black/70 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="mx-6 max-w-[600px] md:min-w-[500px] h-[200px] bg-slate-50 rounded-2xl flex flex-col">
        <div className="flex justify-between items-start p-4">
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Approve Teacher Access
            </h4>
            <p className="text-sm text-muted-foreground w-full md:w-3/4">
              You will approve teacher access to stapp with her/his own
              password.
            </p>
          </div>
          <div>
            <X size={16} onClick={closeModal} />
          </div>
        </div>
        <div className="m-auto flex justify-center space-x-8">
          <Button
            type="submit"
            variant="destructive"
            className="w-24"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-24"
            onClick={changeTeacherRoleHandler}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
