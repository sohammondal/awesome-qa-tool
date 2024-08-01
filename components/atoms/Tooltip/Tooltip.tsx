import React from "react";
import classNames from "classnames";

import styles from "./Tooltip.module.css";

export interface TooltipProps {
  direction: "top" | "right" | "bottom" | "left";
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  direction,
  content,
  children,
}) => {
  const [visible, setVisible] = React.useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className={styles.tooltipContainer}>
      <div
        className={styles.target}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
      >
        {children}
      </div>
      {visible && (
        <div className={classNames(styles.tooltip, styles[direction])}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
