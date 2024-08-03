import React from "react";

import { Button } from "@app/components/atoms/Button";
import { Checkbox } from "@app/components/atoms/Checkbox";
import { TextField, TextInput } from "@app/components/atoms/Input";
import { Modal, ModalProps } from "@app/components/atoms/Modal";
import { Errors, useForm } from "@app/hooks/useForm";
import { useAppDispatch } from "@app/store";
import { addQuestion } from "@app/store/reducers/questions";

import styles from "./AddQuestionModal.module.css";

type AddQuestionModalProps = Pick<ModalProps, "isOpen" | "onClose">;

type AddQuestionFormValues = {
  text: string;
  answer: string;
  withDelay: boolean;
};

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<AddQuestionFormValues>({
      initialValues: {
        text: "",
        answer: "",
        withDelay: false,
      },
      validator: (values) => {
        const errors: Errors<AddQuestionFormValues> = {};
        if (!values.text) errors.text = "Required";
        if (!values.answer) errors.answer = "Required";

        if (values.text && !values.text.endsWith("?"))
          errors.text = 'Question should end with "?"';

        return errors;
      },
    });

  const onSubmit = async () => {
    await dispatch(
      addQuestion({
        question: { text: values.text, answer: values.answer },
        withDelay: values.withDelay,
      })
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a new Question">
      <form
        name="addQuestionForm"
        className={styles.form}
        aria-label="addQuestionForm"
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
