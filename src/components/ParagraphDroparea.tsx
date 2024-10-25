import React, { useState } from "react";
import "@assets/styles/paragraphDroparea.scss";
import { motion } from "framer-motion";
import clsx from "clsx";

type ParagraphDropareaProps = {
  value: string;
  handleDrop: () => void;
};

const ParagraphDroparea: React.FC<ParagraphDropareaProps> = ({
  value,
  handleDrop,
}) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  return (
    <motion.span
      className={clsx("drop-area", { "drop-hover": showDrop, disabled: value })}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        handleDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {value}
    </motion.span>
  );
};

export default ParagraphDroparea;
