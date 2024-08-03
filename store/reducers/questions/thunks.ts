import { sleep } from "@app/helpers/sleep";
import { generateUniqueId } from "@app/helpers/uniqueId";
import { Question } from "@app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AddQuestionPayload {
  question: Omit<Question, "id">;
  withDelay: boolean;
}

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (payload: AddQuestionPayload, thunkAPI) => {
    try {
      if (payload.withDelay) {
        await sleep(5000);
      }

      return {
        ...payload.question,
        id: generateUniqueId(),
      } as Question;
    } catch (error: unknown) {
      if (error) {
        console.error(error.toString());
        return thunkAPI.rejectWithValue(error.toString());
      }
    }
  }
);

interface EditQuestionPayload {
  question: Question;
  withDelay: boolean;
}

export const editQuestion = createAsyncThunk(
  "questions/editQuestion",
  async (payload: EditQuestionPayload, thunkAPI) => {
    try {
      if (payload.withDelay) {
        await sleep(5000);
      }

      return payload.question;
    } catch (error: unknown) {
      if (error) {
        console.error(error.toString());
        return thunkAPI.rejectWithValue(error.toString());
      }
    }
  }
);
