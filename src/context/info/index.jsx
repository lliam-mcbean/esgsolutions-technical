import { createContext, useState, useContext, useEffect } from "react";

const InfoContext = createContext();

export function InfoProvider({ children }) {
  const [info, setInfo] = useState(false);

  useEffect(() => {
    console.log(info)
  }, [info])

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  return useContext(InfoContext);
}