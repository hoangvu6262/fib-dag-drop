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
};

const ELEMENT_RENDERERS: {
  [key in string]: (
    blank: Blank,
    handleDrop: (blankId: number) => void,
    value: string,
    handleInputChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      blankId: number
    ) => void
  ) => JSX.Element;
} = {
  input: (blank, handleDrop, value, handleInputChange) => (
    <ParagraphInput
      key={`blank-${blank.id}`}
      value={value}
      handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e, blank.id)
      }
      handleDrop={() => handleDrop(blank.id)}
    />
  ),

  drag: (blank, handleDrop, value) => (
    <ParagraphDroparea
      key={`blank-${blank.id}`}
      value={value}
      handleDrop={() => handleDrop(blank.id)}
    />
  ),
  default: () => <></>,
};

const ElementEmbed = ({
  value,
  blank,
  handleDrop,
  handleInputChange,
}: ElementEmbedProps): JSX.Element => {
  const renderElement = ELEMENT_RENDERERS[blank?.type];
  return renderElement(blank, handleDrop, value, handleInputChange);
};

export default ElementEmbed;
