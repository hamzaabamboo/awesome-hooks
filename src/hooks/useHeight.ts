import React from "react";

export const useHeight = (ref: React.MutableRefObject<HTMLElement | null>) => {
  const [height, setHeight] = React.useState<number | undefined>(
    ref.current?.clientHeight,
  );

  React.useLayoutEffect(() => {
    if (ref.current && height === undefined) {
      setHeight(ref.current.clientHeight);

      const onResize = () => {
        if (ref.current) {
          setHeight(ref.current.clientHeight);
        }
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  });

  return height;
};
