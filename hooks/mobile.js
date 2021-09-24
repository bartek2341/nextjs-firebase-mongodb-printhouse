import { useEffect, useState } from "react";
import { breakpoints } from "@/data/index";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkSize = (e) => {
    if (e.matches) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoints.sm})`);
    checkSize(mql);
    mql.addEventListener("change", (e) => checkSize(e));
    return () => mql.removeEventListener("change", (e) => checkSize(e));
  }, []);

  return isMobile;
};

export default useMobile;
