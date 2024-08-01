import React from "react";
import classNames from "classnames";

import styles from "./TextField.module.css";
import textInputStyles from "./TextInput.module.css";

export interface TextFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextField = React.forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ label, error, disabled, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label
          className={classNames(textInputStyles.label, {
            [textInputStyles.errorLabel]: Boolean(error),
          })}
        >
          {label}
          <textarea
            ref={ref}
            className={classNames(styles.textarea, {
              [textInputStyles.errorInput]: Boolean(error),
            })}
            disabled={disabled}
            {...props}
          />
        </label>
        {error && <span className={textInputStyles.errorText}>{error}</span>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
