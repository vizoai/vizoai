import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import React from "react";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
        <RemixBrowser />
      </StyleProvider>
    </StrictMode>,
  );
});
