import React, { useState } from "react";
import "../assets/styles/dropInput.scss";
import { motion } from "framer-motion";
import clsx from "clsx";

type DropInputProps = {
  value: string;
  handleDrop: (e: React.DragEvent) => void;
};

const DropInput: React.FC<DropInputProps> = ({ value, handleDrop }) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  return (
    <motion.span
      className={clsx("drop-input", { "drop-hover": showDrop })}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        handleDrop(e);
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {value}
    </motion.span>
  );
};

export default DropInput;
