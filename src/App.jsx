import { Canvas } from '@react-three/fiber'
import './index.css'
import World from './components/world'
import { InfoProvider } from './context/info'
import Info from './components/info'

function App() {

  return (
    <InfoProvider>
      <div className='w-screen h-screen'>
        <Canvas 
          onCreated={({ gl, scene }) => {
            window.scene = scene;
          }}
          camera={{position: [-0.5265 * 12, 0.8083 * 12, -0.2634 * 12]}}
        >
          <World />
          <ambientLight />
        </Canvas>
      </div>
      <Info />
    </InfoProvider>
  )
}

export default App
