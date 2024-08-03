import { Question } from "@app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addQuestion, editQuestion } from "./thunks";

interface QuestionsState {
  entities: Question[];
  isLoading: boolean;
  error: string;
}

const initialState: QuestionsState = {
  entities: [
    {
      id: "sample-question",
      text: "How to add a question?",
      answer: 'Click on the "Add Question" button and fill up the form!',
    },
  ],
  error: "",
  isLoading: false,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    sortAlphabetically: (state) => {
      state.entities.sort((q1, q2) => q1.text.localeCompare(q2.text));
    },
    remove: (state, action: PayloadAction<Pick<Question, "id">>) => {
      state.entities = state.entities.filter(
        (question) => question.id !== action.payload.id
      );
    },
    removeAll: (state) => {
      state.entities = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      if (action.payload) {
        state.entities.push(action.payload);
      }
    });

    builder.addCase(editQuestion.fulfilled, (state, action) => {
      if (action.payload) {
        const questionIndex = state.entities.findIndex(
          (question) => question.id === action.payload?.id
        );

        state.entities[questionIndex] = action.payload;
      }
    });
  },
});

export const questionsSliceActions = questionsSlice.actions;

export default questionsSlice.reducer;

export * from "./selectors";
export * from "./thunks";
