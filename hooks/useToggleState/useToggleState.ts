import React from "react";

export const useToggleState = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
