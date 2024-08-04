import React from "react";

import { Accordion } from "@app/components/atoms/Accordion";
import { Button } from "@app/components/atoms/Button";
import { Tooltip } from "@app/components/atoms/Tooltip";
import { useToggleState } from "@app/hooks/useToggleState";
import { useAppDispatch } from "@app/store";
import { questionsSliceActions } from "@app/store/reducers/questions";
import { Question } from "@app/types";

import { EditQuestionModal } from "../EditQuestionModal/EditQuestionModal";

import styles from "./QuestionItem.module.css";

interface QuestionItemProps {
  question: Question;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const {
    isOpen: isModalOpen,
    open: handleOpenModal,
    close: handleCloseModal,
  } = useToggleState();

  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(questionsSliceActions.remove({ id: question.id }));
  };

  return (
    <React.Fragment>
      <Accordion
        title={
          <div className={styles.title}>
            {question.text}
            <div className={styles.actions}>
              <Tooltip
                placement="left"
                content="You can edit this question using this"
              >
                <Button
                  variant="secondary"
                  kind="text"
                  aria-label="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal();
                  }}
                >
                  Edit
                </Button>
              </Tooltip>
              <Tooltip
                placement="bottom"
                content="You can delete this question using this"
              >
                <Button
                  variant="danger"
                  kind="text"
                  aria-label="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
              </Tooltip>
            </div>
          </div>
        }
      >
        {question.answer}
      </Accordion>
      <EditQuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        question={question}
      />
    </React.Fragment>
  );
};
