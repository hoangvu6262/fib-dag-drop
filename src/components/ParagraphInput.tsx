import React, { Fragment } from "react";
import "@assets/styles/paragraphInput.scss";
import clsx from "clsx";

type ParagraphInput = {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: () => void;
  isSubmitted: boolean;
  correctAnswer: string;
};

const ParagraphInput: React.FC<ParagraphInput> = ({
  value,
  handleInputChange,
  handleDrop,
  isSubmitted,
  correctAnswer,
}) => {
  return (
    <Fragment>
      <input
        type="text"
        placeholder="input"
        value={value}
        onChange={handleInputChange}
        className={clsx("paragraph-input", {
          disabled: !isSubmitted && !!value,
          "answer-success": isSubmitted && value === correctAnswer,
          "answer-danger": isSubmitted && value !== correctAnswer,
        })}
        onDrop={() => handleDrop()}
        onDragOver={(e) => e.preventDefault()}
      />
    </Fragment>
  );
};

export default ParagraphInput;
