import React from "react";

export function useClipboard() {
  const [getText, setGetText] = React.useState<() => Promise<string>>();

  React.useEffect(() => {
    const updateClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          // Do not pass through the text as it might be outdated
          // See https://stackoverflow.com/questions/56306153/domexception-on-calling-navigator-clipboard-readtext
          setGetText((f) => f ?? (() => navigator.clipboard.readText()));
        } else {
          setGetText(undefined);
        }
      } catch (error) {
        // Do nothing
      }
    };

    updateClipboard();

    window.addEventListener("copy", updateClipboard);
    window.addEventListener("visibilitychange", updateClipboard);

    return () => {
      window.removeEventListener("copy", updateClipboard);
      window.removeEventListener("visibilitychange", updateClipboard);
    };
  }, []);

  return getText;
}
