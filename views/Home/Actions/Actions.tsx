import React from "react";

import { Button } from "@app/components/Button";
import { useToggleState } from "@app/hooks/useToggleState";
import { AddQuestionModal } from "@app/modules/Questions/AddQuestionModal/AddQuestionModal";
import { useAppDispatch, useAppSelector } from "@app/store";
import {
  questionsSliceActions,
  selectQuestions,
} from "@app/store/reducers/questions";

import styles from "./Action.module.css";

export const Actions = () => {
  const { isOpen, open, close } = useToggleState();

  const questions = useAppSelector(selectQuestions);

  const dispatch = useAppDispatch();

  const handleSort = () => {
    dispatch(questionsSliceActions.sortAlphabetically());
  };

  const handleDeleteAll = () => {
    dispatch(questionsSliceActions.removeAll());
  };

  return (
    <React.Fragment>
      <section className={styles.actions}>
        <Button variant="success" onClick={open} aria-label="Add Question">
          Add Question
        </Button>
        <Button
          disabled={questions.length < 2}
          variant="primary"
          onClick={handleSort}
          aria-label="Sort Questions"
        >
          Sort Questions
        </Button>
        <Button
          variant="danger"
          disabled={!questions.length}
          onClick={handleDeleteAll}
          aria-label="Remove Questions"
        >
          Remove Questions
        </Button>
      </section>

      <AddQuestionModal isOpen={isOpen} onClose={close} />
    </React.Fragment>
  );
};
