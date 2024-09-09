import React from "react";

import { Typography } from "@app/components/Typography";

import styles from "./PageLayout.module.css";

export interface PageLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  sidebar,
}) => {
  return (
    <div className={styles.pageLayoutOuter}>
      <nav>
        <Typography variant="h1" className={styles.heading}>
          My Awesome QA Tool
        </Typography>
      </nav>
      <div className={styles.pageLayoutInner}>
        <aside className={styles.aside}>{sidebar}</aside>
        <div className={styles.separator} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};
