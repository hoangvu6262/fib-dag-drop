export type option = {
  id: number;
  option: string;
};

export type Blank = {
  id: number;
  position: string;
  correctAnswer: string;
  type: string;
  options?: option[];
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

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}
