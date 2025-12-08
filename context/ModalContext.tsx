"use client";
import React, { createContext, useState } from "react";

const ModalContext = createContext({
  toggleModal: null,
  toggleModalHandler: () => {},
});

export const ModalContextProvider = (props: any) => {
  const [toggleModal, settoggleModal] = useState(false);

  const toggleModalHandler = () => {
    settoggleModal((prevState) => !prevState);
  };

  const context: any = {
    toggleModal: toggleModal,
    toggleModalHandler: toggleModalHandler,
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
