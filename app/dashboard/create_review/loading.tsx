import React from "react";
import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="h-screen w-full  flex justify-center items-center ml-auto">
      <Spinner />
    </div>
  );
};

export default Loading;
