import React from "react";
import classNames from "classnames";

import styles from "./Typography.module.css";

export interface TypographyProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  component?: React.ElementType;
  color?: "default" | "success" | "info" | "warning" | "danger";
  children: React.ReactNode;
  className?: string;
}

const DefaultVariantComponent: Record<
  TypographyProps["variant"],
  React.ElementType
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  component,
  color = "default",
  children,
  ...props
}) => {
  const Component = component || DefaultVariantComponent[variant] || "span";

  return (
    <Component
      className={classNames(styles[variant], styles[color])}
      style={{ color }}
      {...props}
    >
      {children}
    </Component>
  );
};
