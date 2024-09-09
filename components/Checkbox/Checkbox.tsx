import React from "react";
import classNames from "classnames";

import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <label
        className={classNames(styles.checkbox, {
          [styles.error]: Boolean(error),
        })}
      >
        <input type="checkbox" ref={ref} {...props} />
        <span className={styles.checkmark}></span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
