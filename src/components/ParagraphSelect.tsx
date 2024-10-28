import { Fragment } from "react";
import { option } from "../constants/type";
import { compareStringValue } from "../helpers/formatValue";
import clsx from "clsx";
import "../assets/styles/paragraphSelect.scss";

type ParagraphSelectProps = {
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isSubmitted: boolean;
  correctAnswer: string;
  options: option[];
};

const ParagraphSelect: React.FC<ParagraphSelectProps> = ({
  handleInputChange,
  options,
  value,
  isSubmitted,
  correctAnswer,
}) => {
  return (
    <Fragment>
      <select
        value={value}
        onChange={handleInputChange}
        className={clsx("select-container", {
          "answer-success":
            isSubmitted && compareStringValue(value, correctAnswer),
          "answer-danger":
            isSubmitted && !compareStringValue(value, correctAnswer),
        })}
      >
        <option selected>Select Option</option>
        {options?.map((option) => (
          <option
            key={option.id}
            value={option.option}
            className="select-container__option"
          >
            {option.option}
          </option>
        )) || <option disabled>No options available</option>}
      </select>
    </Fragment>
  );
};

export default ParagraphSelect;
