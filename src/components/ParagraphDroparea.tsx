import React, { Fragment, useState } from "react";
import "@assets/styles/paragraphDroparea.scss";
import { motion } from "framer-motion";
import clsx from "clsx";
import { compareStringValue } from "../helpers/formatValue";

type ParagraphDropareaProps = {
  value: string;
  handleDrop: () => void;
  isSubmitted: boolean;
  correctAnswer: string;
};

const ParagraphDroparea: React.FC<ParagraphDropareaProps> = ({
  value,
  handleDrop,
  isSubmitted,
  correctAnswer,
}) => {
  const [showDrop, setShowDrop] = useState<boolean>(false);

  return (
    <Fragment>
      <motion.span
        className={clsx("drop-area", {
          "drop-hover": showDrop,
          disabled: !isSubmitted && !!value,
          "answer-success":
            isSubmitted && compareStringValue(value, correctAnswer),
          "answer-danger":
            isSubmitted && !compareStringValue(value, correctAnswer),
        })}
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
    </Fragment>
  );
};

export default ParagraphDroparea;
