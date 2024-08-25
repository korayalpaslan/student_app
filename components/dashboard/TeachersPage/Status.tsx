"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const Status = ({ isVerified }: any) => {
  const [isChecked, setChecked] = useState(isVerified);
  return (
    <Switch
      id="airplane-mode"
      checked={isChecked}
      onCheckedChange={() => setChecked((prevState: any) => !prevState)}
    />
  );
};

export default Status;
