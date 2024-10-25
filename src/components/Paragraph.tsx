import React, { useState } from "react";
import { question } from "../data/question.json";
import { DragWord } from "../constants/type";
import DropInput from "./DropInput";
import { motion } from "framer-motion";
import "../assets/styles/paragraph.scss";

const typeInput = "[_input]";
const { paragraph, dragWords } = question;

const Paragraph: React.FC = () => {
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [draggedWord, setDraggedWord] = useState<DragWord | null>(null);
  const [dragWordList, setDraggedWordList] = useState<DragWord[]>(dragWords);

  const convertParagraphToInteractive = () => {
    return paragraph.split(/(\[_input\])/).map((part, index) => {
      const blankId = Math.floor(index / 2) + 1;
      if (part === typeInput) {
        return (
          <DropInput
            key={index}
            handleDrop={(e: React.DragEvent) => handleDrop(e, blankId)}
            value={inputs[blankId] || " "}
          />
        );
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  const handleDrop = (e: React.DragEvent, blankId: number) => {
    e.preventDefault();
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

  const getColor = (color: string) => {
    switch (color) {
      case "red":
        return "red";
      case "default":
      default:
        return "black";
    }
  };

  return (
    <div>
      <motion.div layout className="paragraph">
        {convertParagraphToInteractive()}
      </motion.div>
      <div>
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
            style={{
              display: "inline-block",
              padding: "10px",
              margin: "10px",
              cursor: "grab",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ddd",
              color: getColor(dragWord.color),
              fontWeight: "bold",
            }}
          >
            {dragWord.word}
          </motion.span>
        ))}
      </div>

      <button onClick={() => console.log(inputs)}>Submit</button>
    </div>
  );
};

export default Paragraph;
