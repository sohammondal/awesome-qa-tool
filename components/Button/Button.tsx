import React from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  loading?: boolean;
  kind?: "text" | "default";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      kind = "default",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(styles.button, styles[kind], styles[variant])}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className={styles.loader} data-testid="loader"></span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
