"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Loader() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress
      aria-label="Loading..."
      color="primary"
      showValueLabel={true}
      size="lg"
      value={value}
    />
  );
}
