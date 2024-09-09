import { ChangeEvent, FormEvent, useReducer } from "react";

export type Errors<T> = {
  [key in keyof T]?: string;
};

export interface FormState<T> {
  isSubmitting: boolean;
  values: T;
  errors: Errors<T>;
}

enum ActionTypes {
  SET_VALUE = "SET_VALUE",
  SET_ERROR = "SET_ERROR",
  RESET_ERRORS = "RESET_ERRORS",
  SET_SUBMITTING = "SET_SUBMITTING",
  RESET_STATE = "RESET_STATE",
}

type Action<T> =
  | { type: ActionTypes.SET_VALUE; name: keyof T; value: unknown }
  | { type: ActionTypes.SET_ERROR; name: keyof T; error: string }
  | { type: ActionTypes.RESET_ERRORS }
  | { type: ActionTypes.SET_SUBMITTING; value: boolean }
  | { type: ActionTypes.RESET_STATE; payload: T };

const formReducer = <T>(
  state: FormState<T>,
  action: Action<T>
): FormState<T> => {
  switch (action.type) {
    case ActionTypes.SET_VALUE:
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.name]: action.error },
      };
    case ActionTypes.RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case ActionTypes.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.value,
      };
    case ActionTypes.RESET_STATE:
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
      type: ActionTypes.SET_VALUE,
      name,
      value: type === "checkbox" ? checked : value,
    });

    dispatch({
      type: ActionTypes.SET_ERROR,
      name,
      error: "",
    });
  };

  const handleSubmit =
    (callback?: () => Promise<void> | void) => async (e?: FormEvent) => {
      e?.preventDefault?.();
      if (validate()) {
        dispatch({ type: ActionTypes.SET_SUBMITTING, value: true });
        await callback?.();
        dispatch({ type: ActionTypes.SET_SUBMITTING, value: false });
        resetForm();
      }
    };

  const resetForm = () => {
    dispatch({ type: ActionTypes.RESET_STATE, payload: initialValues });
  };

  const hasErrors = (errors = state.errors) =>
    Object.values(errors).some((error) => Boolean(error));

  const validate = () => {
    const newErrors: Errors<T> = validator?.(state.values) || {};

    dispatch({ type: ActionTypes.RESET_ERRORS });

    Object.entries(newErrors).map(([name, error]) => {
      dispatch({
        type: ActionTypes.SET_ERROR,
        name,
        error: error || "",
      });
    });

    return !hasErrors(newErrors);
  };

  const clearErrors = () => {
    dispatch({ type: ActionTypes.RESET_ERRORS });
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
