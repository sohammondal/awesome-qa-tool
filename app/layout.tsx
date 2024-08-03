import React from "react";

import { RootLayout } from "@app/layouts/RootLayout/RootLayout";
import { StoreProvider } from "@app/store/StoreProvider";
export { metadata } from "@app/seo";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <RootLayout>{children}</RootLayout>
    </StoreProvider>
  );
};

export default Layout;
