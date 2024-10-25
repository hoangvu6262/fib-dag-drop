export type Blank = {
  id: number;
  position: string;
  correctAnswer: string;
  type: string;
  options?: string[]; // Optional for drop-down
};

export type DragWord = {
  word: string;
  color: string;
  id: number;
};

export type Question = {
  paragraph: string;
  blanks: Blank[];
  dragWords: DragWord[];
};

export type QuestionData = {
  question: Question;
};
