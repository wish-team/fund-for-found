import React, { useState, useEffect } from "react";

const useMediaQuery = (): boolean => {
  const [matches, setMatches] = useState<boolean | null>(null);  // Initially null

  useEffect(() => {
    if (typeof window === "undefined") return;  // Check if we're in the browser

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Set the initial match state based on the current window size
    setMatches(mediaQuery.matches);

    // Define a handler for media query changes
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add the event listener to update the match state on changes
    mediaQuery.addEventListener("change", handler);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handler);
  }, []); // Empty array ensures this effect runs once on mount

  return matches ?? false;  // Return false if null (SSR-safe default)
};

export default useMediaQuery;
