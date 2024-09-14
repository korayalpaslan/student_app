"use client";
import React, { createContext, useState } from "react";

const ToggleContext = createContext({
  toggleMenu: null,
  toggleMenuHandler: () => {},
});

export const ToggleContextProvider = (props: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleMenuHandler = () => {
    setToggleMenu((prevState) => !prevState);
  };

  const context: any = {
    toggleMenu: toggleMenu,
    toggleMenuHandler: toggleMenuHandler,
  };

  return (
    <ToggleContext.Provider value={context}>
      {props.children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
