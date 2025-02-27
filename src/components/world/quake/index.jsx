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

    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
      }
  
    useFrame(() => {
      if (!meshRef.current || startTime === null) return;
  
      const elapsed = performance.now() - startTime;
      if (elapsed > duration) {
        setStartTime(null);
        meshRef.current.scale.set(1, 1, 1);
        return;
      }

      console.log(clamp(elapsed * 0.001, 0, 1))
  
      const scaleFactor = 1 + (0.5 * 1/clamp(elapsed * 0.001, 0.2, 1)) * Math.sin(elapsed * 0.01);
      meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    });

    useEffect(() => {
        if (meshRef.current) {
          meshRef.current.userData.testid = "r3f-sphere"
        }
    }, [meshRef.current]);


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
