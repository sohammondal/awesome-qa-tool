import React from "react";

import { Typography } from "@app/components/atoms/Typography";
import { useAppSelector } from "@app/store";
import { selectQuestions } from "@app/store/reducers/questions";

import styles from "./SideBar.module.css";

export const SideBar = () => {
  const questions = useAppSelector(selectQuestions);

  let content = `You have no questions.`;

  if (questions.length === 1) {
    if (questions[0].id === "sample-question") {
      content = `You can find 1 question already added for you.`;
    } else {
      content = `Congratulations you have added your own question.`;
    }
  }

  if (questions.length > 1) {
    content = `You have total ${questions.length} questions.`;
  }

  return (
    <Typography variant="body1" className={styles.info}>
      {content} Feel free to add more questions!
    </Typography>
  );
};
