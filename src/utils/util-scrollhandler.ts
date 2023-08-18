export const scrollHandler = {
  /**
   * disabled scroll event
   */
  disabledScroll: () => {
    document.body.style.overflowY = "hidden";
    window.scrollTo(0, 0);
  },
  /**
   * enabled scroll event
   */
  enabledScroll: () => {
    document.body.style.overflowY = "auto";
  },
};
