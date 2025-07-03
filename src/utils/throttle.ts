export const throttle = (fn: () => void, delay: number) => {
    let lastExec = 0;
    return () => {
      const now = Date.now();
      if (now - lastExec >= delay) {
        fn();
        lastExec = now;
      }
    };
  };

  