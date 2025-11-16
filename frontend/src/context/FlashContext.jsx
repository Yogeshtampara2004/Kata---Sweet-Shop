import React, { createContext, useState, useCallback, useMemo } from "react";

export const FlashContext = createContext(null);

export function FlashProvider({ children }) {
  const [msg, setMsg] = useState(null);

  const show = useCallback((text, type = "success", ms = 2200) => {
    setMsg({ text, type });
    window.clearTimeout(show._t);
    show._t = window.setTimeout(() => setMsg(null), ms);
  }, []);

  const value = useMemo(() => ({ msg, show, clear: () => setMsg(null) }), [msg, show]);

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>;
}
