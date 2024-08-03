"use client";

import React from "react";

import { PageLayout } from "@app/layouts/PageLayout";

import { Actions } from "./Actions/Actions";
import { QuestionsList } from "./QuestionsList/QuestionsList";
import { SideBar } from "./SideBar/SideBar";

import styles from "./Home.module.css";

export const Home = () => {
  return (
    <PageLayout sidebar={<SideBar />}>
      <div className={styles.home}>
        <Actions />
        <QuestionsList />
      </div>
    </PageLayout>
  );
};
