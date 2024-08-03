import React, { ReactElement } from "react";
import { Provider } from "react-redux";

import { RootState } from "@app/store";
import { rootReducer } from "@app/store/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";

import "@testing-library/jest-dom";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    initialState: DeepPartial<RootState>;
  }
) => {
  const store = configureStore({
    preloadedState: options?.initialState as RootState,
    reducer: rootReducer,
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export * from "@testing-library/user-event";
export { customRender as render };
