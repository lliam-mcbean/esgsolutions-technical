import React, { useEffect, useRef, useState } from 'react'
import fragmentShader from '../../../shaders/topo/fragment.glsl'
import vertexShader from '../../../shaders/topo/vertex.glsl'
import { useFrame } from '@react-three/fiber';
import { useInfo } from '../../../context/info';


export default function Quake({position, location, coords, amplitude, duration = 1000, depth}) {
    const [hovered, setHovered] = useState(false)
    const {setInfo} = useInfo()

    const meshRef = useRef(null);
    const [startTime, setStartTime] = useState(null);
  
    useFrame(() => {
      if (!meshRef.current || startTime === null) return;
  
      const elapsed = performance.now() - startTime;
      if (elapsed > duration) {
        setStartTime(null);
        meshRef.current.scale.set(1, 1, 1);
        return;
      }
  
      const scaleFactor = 1 + 0.5 * Math.sin((elapsed / duration) * Math.PI * 2);
      meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    });


    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

  return (
    <>
    <mesh
        className='cursor-pointer' 
        position={position} 
        ref={meshRef}
        onPointerOver={() => {
            setHovered(true)
        }}
        onPointerOut={() => {
            setHovered(false)
        }}
        onClick={() => { 
            
            setStartTime(performance.now())
            setInfo({
                amplitude,
                coords,
                location,
                depth
            })
        }}>
        <sphereGeometry args={[0.003 * amplitude]} />
        <shaderMaterial 
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={{
                uAmplitude: {value: amplitude},
                uPulseIntensity: {value: 0},
                uTime: {value: 0}
            }}
        />
    </mesh>
    </>
  )
}
