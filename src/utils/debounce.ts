/**
 * debounce - Returns a debounced version of the given function.
 * The debounced function delays invoking `fn` until after `delay` milliseconds
 * have elapsed since the last time it was invoked.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - Delay time in milliseconds.
 * @param {boolean} immediate - If true, trigger the function on the leading edge instead of the trailing.
 * @returns {Function} - Debounced function.
 */
export function debounce(fn:any, delay = 300, immediate = false) {
  let timer:any = null;

  return function debounced(...args) {
    const context = this;

    if (timer) clearTimeout(timer);

    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}