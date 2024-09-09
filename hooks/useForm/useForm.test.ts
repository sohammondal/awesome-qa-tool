import { ChangeEvent } from "react";

import { act, renderHook } from "@app/utils/test";

import { Errors, useForm } from "./useForm";

type FormValues = {
  text: string;
};

describe("useForm", () => {
  it("should render form with default values", () => {
    const { result: form } = renderHook(() =>
      useForm<FormValues>({
        initialValues: { text: "" },
        validator: (values) => {
          const errors: Errors<FormValues> = {};
          if (!values.text) {
            errors.text = "Required!";
          }
          return errors;
        },
      })
    );

    // check default state
    expect(form.current.values.text).toBe("");
    expect(form.current.isSubmitting).toBe(false);
    expect(form.current.errors.text).toBeUndefined();
  });

  it("should return errors if validator returns errors", () => {
    const { result: form } = renderHook(() =>
      useForm<FormValues>({
        initialValues: { text: "" },
        validator: (values) => {
          const errors: Errors<FormValues> = {};
          if (!values.text) {
            errors.text = "Required!";
          }
          return errors;
        },
      })
    );

    // change text value & submit form
    act(() => {
      form.current.handleChange({ target: { value: "" } } as ChangeEvent<
        EventTarget & HTMLInputElement
      >);
      form.current.handleSubmit()();
    });

    // check for errors
    expect(form.current.errors.text).toBe("Required!");
  });
});
