"use client";
import ModalContext from "@/context/ModalContext";
import { useState, useContext } from "react";
import { Switch } from "@/components/ui/switch";

const Status = ({ isVerified, id, setStudentId }: any) => {
  const [isChecked, setChecked] = useState(isVerified);
  const ctx = useContext(ModalContext);

  const changeHandler = async () => {
    await setStudentId(id);
    await ctx.toggleModalHandler();
    await setChecked((prevState: any) => !prevState);
  };
  return (
    <Switch
      id="airplane-mode"
      checked={isChecked}
      onCheckedChange={changeHandler}
    />
  );
};

export default Status;
