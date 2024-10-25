import React, { useState } from "react";
import { question } from "../data/question.json";
import { DragWord } from "../constants/type";
import { motion } from "framer-motion";

import "@assets/styles/paragraph.scss";
import ElementEmbed from "./ElementEmbed";

const typeInput = "[_input]";
const { paragraph, blanks, dragWords } = question;

const Paragraph: React.FC = () => {
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [draggedWord, setDraggedWord] = useState<DragWord | null>(null);
  const [dragWordList, setDraggedWordList] = useState<DragWord[]>(dragWords);

  const convertParagraphToInteractive = () => {
    let blankIndex = 0;
    return paragraph.split(/(\[_input\])/).map((part, index) => {
      if (part === typeInput) {
        const blank = blanks[blankIndex];
        blankIndex++;
        return (
          <ElementEmbed
            key={index}
            handleDrop={() => handleDrop(blank.id)}
            value={inputs[blankIndex] || ""}
            blank={blank}
            handleInputChange={handleInputChange}
          />
        );
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
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
      alert("Sai từ rồi, hãy thử lại.");
    }
    setDraggedWord(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    blankId: number
  ) => {
    setInputs((prev) => ({ ...prev, [blankId]: e.target.value.trim() }));
  };

  const handleSubmit = () => {
    const correctAnswers = blanks.every((blank) => {
      return inputs[blank.id] === blank.correctAnswer;
    });

    if (correctAnswers) {
      alert("Chính xác!");
    } else {
      alert("Sai rồi, thử lại nhé!");
    }
  };

  return (
    <div className="paragraph-container">
      <motion.div layout className="paragraph-container__content">
        {convertParagraphToInteractive()}
      </motion.div>
      <div className="paragraph-container__words">
        {dragWordList.map((dragWord) => (
          <motion.span
            layout
            layoutId={dragWord.word}
            whileHover={{ scale: 1.2 }}
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

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Paragraph;
