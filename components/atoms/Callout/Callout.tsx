import React from "react";
import classNames from "classnames";

import styles from "./Callout.module.css";

interface CalloutProps {
  variant?: "primary" | "secondary" | "danger" | "success";
}

export const Callout: React.FC<React.PropsWithChildren<CalloutProps>> = ({
  variant = "primary",
  children,
}) => {
  return (
    <div className={classNames(styles.callout, styles[variant])}>
      {children}
    </div>
  );
};
