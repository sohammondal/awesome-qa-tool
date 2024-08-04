import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./Tooltip.module.css";

interface TooltipProps {
  placement: "top" | "right" | "bottom" | "left";
  content: React.ReactNode;
  children: React.ReactNode;
  withArrow?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = "top",
  withArrow = false,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !tooltipRef.current?.contains(event.target as Node)
      ) {
        setIsTooltipOpen(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipOpen && (
        <div
          ref={tooltipRef}
          className={classNames(styles.tooltip, styles[placement])}
        >
          {withArrow && <div className={styles.tooltipArrow}></div>}
          {content}
        </div>
      )}
    </div>
  );
};
