import React, { ReactElement } from "react";

import { render, RenderOptions } from "@testing-library/react";

import "@testing-library/jest-dom";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export * from "@testing-library/user-event";
export { customRender as render };
