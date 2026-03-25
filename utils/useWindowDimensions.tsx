import { useState, useEffect } from "react";

interface WindowDimensions {
  width: number | undefined;
  height: number | undefined;
}

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial call to set dimensions on mount
    updateWindowDimensions();

    // Event listener to update dimensions on window resize
    window.addEventListener("resize", updateWindowDimensions);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return windowDimensions;
};

export default useWindowDimensions;
