import React, { Fragment } from "react";
import "@assets/styles/paragraphInput.scss";
import clsx from "clsx";

type ParagraphInput = {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: () => void;
};

const ParagraphInput: React.FC<ParagraphInput> = ({
  value,
  handleInputChange,
  handleDrop,
}) => {
  return (
    <Fragment>
      <input
        type="text"
        placeholder="input"
        value={value}
        onChange={handleInputChange}
        className={clsx("paragraph-input", { disabled: !!value })}
        onDrop={() => handleDrop()}
        onDragOver={(e) => e.preventDefault()}
      />
    </Fragment>
  );
};

export default ParagraphInput;
