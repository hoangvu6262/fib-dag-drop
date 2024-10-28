import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import ElementEmbed from "./ElementEmbed";
import { useNotificationStore } from "../stores/useNotificationStore";
import { DragWord, NotificationType, Question } from "../constants/type";
import { EMBEDDED_STRING } from "../constants/general";

import "@assets/styles/paragraph.scss";
import { isEmptyObject } from "../helpers/emptyOject";

type ParagraphProps = {
  question: Question;
};

const Paragraph: React.FC<ParagraphProps> = ({ question }) => {
  const { paragraph, blanks, dragWords } = question;
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [draggedWord, setDraggedWord] = useState<DragWord | null>(null);
  const [dragWordList, setDraggedWordList] = useState<DragWord[]>(dragWords);
  const [submitted, setSubmitted] = useState(false);

  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const convertParagraphToInteractive = () => {
    let blankIndex = 0;
    return paragraph.split(/(\[_input\])/).map((part, index) => {
      if (part === EMBEDDED_STRING) {
        const blank = blanks[blankIndex];
        blankIndex++;
        return (
          <ElementEmbed
            key={index}
            handleDrop={() => handleDrop(blank.id)}
            value={inputs[blankIndex] || ""}
            blank={blank}
            handleInputChange={handleInputChange}
            isSubmitted={submitted}
          />
        );
      }
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{ __html: part }}
          className="paragraph-container__content-span"
        />
      );
    });
  };

  const handleDrop = (blankId: number) => {
    const correctBlank = question.blanks.find((blank) => blank.id === blankId);
    if (
      draggedWord &&
      correctBlank &&
      draggedWord.word === correctBlank.correctAnswer
    ) {
      setInputs((prevBlanks) => ({
        ...prevBlanks,
        [blankId]: draggedWord.word,
      }));

      setDraggedWordList((words) =>
        words.filter((word) => word.id !== draggedWord.id)
      );
    } else {
      addNotification("Wrong word, try again!", NotificationType.WARNING);
    }
    setDraggedWord(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    blankId: number
  ) => {
    setInputs((prev) => ({ ...prev, [blankId]: e.target.value.trim() }));
  };

  const handleSubmit = () => {
    if (Object.keys(inputs).length < blanks.length) {
      addNotification(
        "You have to fill all the blanks",
        NotificationType.WARNING
      );
    } else {
      const correctAnswers = blanks.every((blank) => {
        return inputs[blank.id] === blank.correctAnswer;
      });

      if (correctAnswers) {
        addNotification("Correct!!", NotificationType.SUCCESS);
      } else {
        addNotification("Oops, Incorrect!!", NotificationType.ERROR);
      }
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setInputs({});
    setDraggedWord(null);
    setSubmitted(false);
    setDraggedWordList(dragWords);
  };

  return (
    <Fragment>
      <div className="paragraph-container">
        <motion.div layout className="paragraph-container__content">
          {convertParagraphToInteractive()}
        </motion.div>
        <div className="paragraph-container__words">
          {dragWordList.map((dragWord) => (
            <motion.span
              layout
              layoutId={dragWord.id.toString()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              key={dragWord.id}
              draggable="true"
              onDragStart={() => setDraggedWord(dragWord)}
              onDragEnd={() => setDraggedWord(null)}
              className="paragraph-container__words-word"
              color={dragWord.color === "red" ? "red" : "black"}
            >
              {dragWord.word}
            </motion.span>
          ))}
        </div>
        <div className="paragraph-container__buttons">
          <button
            onClick={handleReset}
            className="paragraph-container__buttons-reset"
            disabled={!submitted && isEmptyObject(inputs)}
          >
            {submitted ? "Try again" : "Reset"}
          </button>
          <button
            disabled={submitted}
            onClick={handleSubmit}
            className="paragraph-container__buttons-submit"
          >
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Paragraph;
