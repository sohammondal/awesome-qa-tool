import { combineReducers } from "@reduxjs/toolkit";

import questionsReducer from "./questions";

export const rootReducer = combineReducers({
  questions: questionsReducer,
});
