import { useState, useEffect } from "react";

export const useScreenPosition = (ref: HTMLElement | null) => {
  const [position, setPosition] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const handleEvent = (event: Event) => {
      setPosition({
        x: (event.currentTarget as HTMLElement).scrollLeft,
        y: (event.currentTarget as HTMLElement).scrollTop,
      });
    };

    if (ref) {
      ref.addEventListener("scroll", handleEvent);

      return () => {
        ref.removeEventListener("scroll", handleEvent);
      };
    }
  }, [ref]);

  return position;
};
