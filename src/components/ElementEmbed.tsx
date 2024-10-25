import { Blank } from "../constants/type";
import DropInput from "./DropInput";

type ElementEmbedProps = {
  blank: Blank;
  handleDrop: (blankId: number) => void;
};

const ELEMENT_RENDERERS: {
  [key in string]: (
    blank: Blank,
    handleDrop: (blankId: number) => void
  ) => JSX.Element;
} = {
  input: (blank) => (
    <input
      type="text"
      key={`blank-${blank.id}`}
      data-blankid={blank.id}
      style={{ width: "100px", margin: "0 5px" }}
    />
  ),

  drag: (blank, handleDrop) => (
    <DropInput blankId={blank.id} handleDrop={() => handleDrop(blank.id)} />
  ),
};

const ElementEmbed = ({
  blank,
  handleDrop,
}: ElementEmbedProps): JSX.Element => {
  const renderElement = ELEMENT_RENDERERS[blank.type];
  return renderElement(blank, handleDrop);
};

export default ElementEmbed;
