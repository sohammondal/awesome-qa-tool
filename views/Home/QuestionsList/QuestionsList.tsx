import React from "react";

import { Typography } from "@app/components/atoms/Typography";
import { QuestionItem } from "@app/modules/Questions/QuestionItem/QuestionItem";
import { useAppSelector } from "@app/store";
import { selectQuestions } from "@app/store/reducers/questions";

import styles from "./QuestionsList.module.css";

export const QuestionsList = () => {
  const questions = useAppSelector(selectQuestions);

  return (
    <section className={styles.questions}>
      {!questions.length && (
        <Typography variant="body1" color="red">
          No questions :(
        </Typography>
      )}
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </section>
  );
};
