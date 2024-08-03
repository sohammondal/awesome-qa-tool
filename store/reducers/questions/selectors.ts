import { Question } from "@app/types";

import { RootState } from "../../store";

export const selectQuestions = (state: RootState) => state.questions.entities;
export const selectQuestion = (state: RootState, id: Question["id"]) =>
  state.questions.entities.find((question) => question.id === id);
