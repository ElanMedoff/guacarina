import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener(
      "resize",
      throttle(() => handleResize(), 100),
      { passive: true }
    );
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
