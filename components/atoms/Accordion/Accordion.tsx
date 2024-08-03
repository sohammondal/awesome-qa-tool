import React from "react";
import classNames from "classnames";

import styles from "./Accordion.module.css";

export interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={styles.accordion}>
      <div className={styles.header} onClick={toggleOpen}>
        <span
          className={classNames(styles.icon, { [styles.iconRotate]: isOpen })}
        >
          ▶
        </span>
        {title}
      </div>
      <div
        className={classNames(styles.contentCollapsed, {
          [styles.expand]: isOpen,
        })}
      >
        {isOpen ? children : undefined}
      </div>
    </div>
  );
};
