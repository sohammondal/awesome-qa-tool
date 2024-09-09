import React from "react";
import classNames from "classnames";

import styles from "./TextInput.module.css";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, disabled, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label
          className={classNames(styles.label, {
            [styles.errorLabel]: Boolean(error),
          })}
        >
          {label}
          <input
            ref={ref}
            className={classNames(styles.input, {
              [styles.errorInput]: Boolean(error),
            })}
            disabled={disabled}
            {...props}
          />
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
