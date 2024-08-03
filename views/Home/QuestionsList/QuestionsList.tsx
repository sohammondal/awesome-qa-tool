import React from "react";

import { Callout } from "@app/components/atoms/Callout";
import { QuestionItem } from "@app/modules/Questions/QuestionItem/QuestionItem";
import { useAppSelector } from "@app/store";
import { selectQuestions } from "@app/store/reducers/questions";

import styles from "./QuestionsList.module.css";

export const QuestionsList = () => {
  const questions = useAppSelector(selectQuestions);

  return (
    <section className={styles.questions}>
      {!questions.length && <Callout variant="danger">No questions :(</Callout>}
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </section>
  );
};
