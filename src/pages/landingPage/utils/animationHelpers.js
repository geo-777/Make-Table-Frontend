export const easeOut = [0.16, 1, 0.3, 1];
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: i * 0.06 },
  }),
};
