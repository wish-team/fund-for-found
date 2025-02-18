export const dropdownVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: 0.2,
    },
  },
};

export const arrowVariants = {
  open: { rotate: 180, transition: { duration: 0.3 } },
  closed: { rotate: 0, transition: { duration: 0.3 } },
};

export const listItemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};
