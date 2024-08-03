import { ChangeEvent, FormEvent, useReducer } from "react";

export type Errors<T> = {
  [key in keyof T]?: string;
};

export interface FormState<T> {
  isSubmitting: boolean;
  values: T;
  errors: Errors<T>;
}

type Action<T> =
  | { type: "SET_VALUE"; name: keyof T; value: any }
  | { type: "SET_ERROR"; name: keyof T; error: string }
  | { type: "RESET_ERRORS" }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "RESET_STATE"; payload: T };

const formReducer = <T>(
  state: FormState<T>,
  action: Action<T>
): FormState<T> => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.name]: action.error },
      };
    case "RESET_ERRORS":
      return {
        ...state,
        errors: {},
      };
    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.value,
      };
    case "RESET_STATE":
      return {
        ...state,
        values: action.payload,
        errors: {},
      };
    default:
      return state;
  }
};

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validator,
}: {
  initialValues: T;
  validator?: (values: T) => Errors<T>;
}) => {
  const [state, dispatch] = useReducer(formReducer<T>, {
    values: initialValues,
    errors: {},
    isSubmitting: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    dispatch({
      type: "SET_VALUE",
      name,
      value: type === "checkbox" ? checked : value,
    });

    dispatch({
      type: "SET_ERROR",
      name,
      error: "",
    });
  };

  const handleSubmit =
    (callback?: () => Promise<void> | void) => async (e?: FormEvent) => {
      e?.preventDefault?.();
      if (validate()) {
        dispatch({ type: "SET_SUBMITTING", value: true });
        await callback?.();
        dispatch({ type: "SET_SUBMITTING", value: false });
        resetForm();
      }
    };

  const resetForm = () => {
    dispatch({ type: "RESET_STATE", payload: initialValues });
  };

  const hasErrors = (errors = state.errors) =>
    Object.values(errors).some((error) => Boolean(error));

  const validate = () => {
    const newErrors: Errors<T> = validator?.(state.values) || {};

    dispatch({ type: "RESET_ERRORS" });

    Object.entries(newErrors).map(([name, error]) => {
      dispatch({
        type: "SET_ERROR",
        name,
        error: error || "",
      });
    });

    return !hasErrors(newErrors);
  };

  const clearErrors = () => {
    dispatch({ type: "RESET_ERRORS" });
  };

  return {
    values: state.values,
    handleChange,

    handleSubmit,
    isSubmitting: state.isSubmitting,

    errors: state.errors,
    hasErrors: hasErrors(),
    clearErrors,
  };
};
