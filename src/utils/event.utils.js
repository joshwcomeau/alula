export const disableEventOnMobile = ev => {
  const isTouchEvent = !!ev.touches;

  if (isTouchEvent) {
    // Prevent default "scroll" behaviour on mobile.
    ev.preventDefault();
    ev.stopPropagation();
  }
};
