import React from "react";

import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", loading = false, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]}`}
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
