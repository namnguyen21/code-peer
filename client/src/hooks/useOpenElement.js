import { useState } from "react";

const useOpenElement = (inititalState) => {
  const [isOpen, setIsOpen] = useState(inititalState);

  const handleChange = () => {
    setIsOpen((open) => !open);
  };

  return [isOpen, handleChange]
};

export default useOpenElement;
