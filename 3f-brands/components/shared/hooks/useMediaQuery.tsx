import React, { useState, useEffect } from "react";

const useMediaQuery = (): boolean => {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Explicitly type the event parameter
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add listener
    mediaQuery.addEventListener("change", handler);

    // Return cleanup function
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return matches;
};

export default useMediaQuery;
