import { useEffect } from "react";

const asyncUseEffect = (fn: any, deps: any[] = []) => {
  return useEffect(() => {
    (async () => {
      await fn();
    })();
  }, deps);
};

export default asyncUseEffect;
