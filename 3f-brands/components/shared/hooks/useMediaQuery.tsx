import React, { useState, useEffect } from "react";

const useMediaQuery = (): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined to prevent SSR issues
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Set initial match state based on current window width
    setMatches(mediaQuery.matches);

    // Define handler for media query changes
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add event listener to update match state on change
    mediaQuery.addEventListener("change", handler);

    // Clean up event listener on component unmount
    return () => mediaQuery.removeEventListener("change", handler);
  }, []); // Empty dependency array to run effect only once when the component mounts

  return matches;
};

export default useMediaQuery;
