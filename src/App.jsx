import { Canvas } from '@react-three/fiber'
import './index.css'
import World from './components/world'
import { InfoProvider } from './context/info'
import Info from './components/info'
import { useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [mapCanvas, setMapCanvas] = useState(null);
  const [earthquakeRange, setEarthquakeRange] = useState(0)

  return (
    <InfoProvider>
      <div className='w-screen h-screen'>
        <Canvas camera={{position: [-0.5265 * 12, 0.8083 * 12, -0.2634 * 12]}}>
          <World earthquakeRange={earthquakeRange}/>
          <ambientLight />
        </Canvas>
      </div>
      <Info earthquakeRange={earthquakeRange} setEarthquakeRange={setEarthquakeRange} />
    </InfoProvider>
  )
}

export default App
