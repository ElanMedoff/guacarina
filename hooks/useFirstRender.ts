import { useEffect, useRef } from "react";

export default function useFirstRender() {
  const render = useRef(true);
  useEffect(() => {
    render.current = false;
  }, []);

  return render.current;
}
