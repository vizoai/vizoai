"use client";

import { memo } from "react";

const ErrorCapture = memo(() => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Sorry, we couldn't load the page you requested.</p>
    </div>
  );
});

ErrorCapture.displayName = "ErrorCapture";

export default ErrorCapture;
