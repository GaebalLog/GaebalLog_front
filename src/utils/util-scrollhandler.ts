export const scrollHandler = {
  /**
   * disabled scroll event
   */
  disabledScroll: () => {
    document.body.style.overflowY = "hidden";
  },
  /**
   * enabled scroll event
   */
  enabledScroll: () => {
    document.body.style.overflowY = "auto";
  },
};
