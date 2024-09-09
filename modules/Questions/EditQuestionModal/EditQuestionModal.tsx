import React from "react";

import { Button } from "@app/components/Button";
import { Checkbox } from "@app/components/Checkbox";
import { TextField, TextInput } from "@app/components/Input";
import { Modal, ModalProps } from "@app/components/Modal";
import { Errors, useForm } from "@app/hooks/useForm";
import { useAppDispatch } from "@app/store";
import { editQuestion } from "@app/store/reducers/questions";
import { Question } from "@app/types";

import styles from "./EditQuestionModal.module.css";

type EditQuestionModalProps = Pick<ModalProps, "isOpen" | "onClose"> & {
  question: Question;
};

type EditQuestionFormValues = {
  text: string;
  answer: string;
  withDelay: boolean;
};

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
}) => {
  const dispatch = useAppDispatch();

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<EditQuestionFormValues>({
      initialValues: {
        text: question.text,
        answer: question.answer,
        withDelay: false,
      },
      validator: (values) => {
        const errors: Errors<EditQuestionFormValues> = {};
        if (!values.text) errors.text = "Required";
        if (!values.answer) errors.answer = "Required";

        if (values.text && !values.text.endsWith("?"))
          errors.text = 'Question should end with "?"';

        return errors;
      },
    });

  const onSubmit = async () => {
    await dispatch(
      editQuestion({
        question: { id: question.id, text: values.text, answer: values.answer },
        withDelay: values.withDelay,
      })
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Question">
      <form
        name="editQuestionForm"
        className={styles.form}
        aria-label="editQuestionForm"
      >
        <div>
          <TextInput
            label="Question"
            name="text"
            value={values.text}
            onChange={handleChange}
            error={errors.text}
            required
          />
          <TextField
            label="Answer"
            name="answer"
            value={values.answer}
            onChange={handleChange}
            error={errors.answer}
            required
          />
          <Checkbox
            label="5s delay"
            name="withDelay"
            checked={values.withDelay}
            onChange={handleChange}
            error={Boolean(errors.withDelay)}
          />
        </div>
        <div>
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
