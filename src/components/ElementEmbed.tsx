import { BlankTypes } from "../constants/general";
import { Blank } from "../constants/type";
import ParagraphDroparea from "./ParagraphDroparea";
import ParagraphInput from "./ParagraphInput";

type ElementEmbedProps = {
  value: string;
  blank: Blank;
  handleDrop: (blankId: number) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    blankId: number
  ) => void;
  isSubmitted: boolean;
};

const ELEMENT_RENDERERS: {
  [key in string]: ({
    blank,
    value,
    handleDrop,
    handleInputChange,
    isSubmitted,
  }: ElementEmbedProps) => JSX.Element;
} = {
  [BlankTypes.INPUT]: ({ blank, value, handleInputChange, isSubmitted }) => (
    <ParagraphInput
      key={`blank-${blank.id}`}
      value={value}
      handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e, blank.id)
      }
      // handleDrop={() => handleDrop(blank.id)}
      isSubmitted={isSubmitted}
      correctAnswer={blank.correctAnswer}
    />
  ),

  [BlankTypes.DRAG]: ({ blank, handleDrop, value, isSubmitted }) => (
    <ParagraphDroparea
      key={`blank-${blank.id}`}
      value={value}
      handleDrop={() => handleDrop(blank.id)}
      isSubmitted={isSubmitted}
      correctAnswer={blank.correctAnswer}
    />
  ),
  default: () => <></>,
};

const ElementEmbed = ({
  value,
  blank,
  handleDrop,
  handleInputChange,
  isSubmitted,
}: ElementEmbedProps): JSX.Element => {
  const renderElement = ELEMENT_RENDERERS[blank?.type];
  return renderElement({
    blank,
    handleDrop,
    value,
    handleInputChange,
    isSubmitted,
  });
};

export default ElementEmbed;
