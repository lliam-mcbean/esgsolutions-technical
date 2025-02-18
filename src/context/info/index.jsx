import { createContext, useState, useContext } from "react";

const InfoContext = createContext();

export function InfoProvider({ children }) {
  const [info, setInfo] = useState(false);
  const [earthquakeRange, setEarthquakeRange] = useState(0)
  const [displacementRange, setDisplacementRange] = useState(0)
  const [worldOpacity, setWorldOpacity] = useState(1)
  const [worldScale, setWorldScale] = useState(1)

  return (
    <InfoContext.Provider value={{ 
      info, 
      setInfo, 
      displacementRange, 
      setDisplacementRange, 
      earthquakeRange, 
      setEarthquakeRange, 
      worldOpacity, 
      setWorldOpacity,
      worldScale,
      setWorldScale
      }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  return useContext(InfoContext);
}