import React, { useEffect, useState } from 'react'
import data from '../../data/earthquakes.json'
import { OrbitControls, useTexture } from '@react-three/drei'
import Quake from './quake'


export default function World({earthquakeRange}) {
    const [map, displacement, borders] = useTexture(['/textures/earthmap.jpg', '/textures/occulantearth.jpg', '/textures/countries.png'])
    const radius = 10
    const [mappedData, setMappedData] = useState([])

  useEffect(() => {
        setMappedData(data.map((el, i) => {
        const newLat = el["Latitude"] * (Math.PI / 180);
        const newLong = el["Longitude"] * (Math.PI / 180);
      
        const z = Math.cos(newLat) * Math.cos(newLong) * radius;
        const x = Math.cos(newLat) * Math.sin(newLong) * radius;
        const y = Math.sin(newLat) * radius;

        if (el["ML"] > earthquakeRange) {
          return (
            <Quake key={`earthquake-${i}`} position={[x,y,z]} location={el['Location']} amplitude={el["ML"]} coords={[el["Latitude"], el["Longitude"]]}/>
        )
        }
  }))

  }, [earthquakeRange])

  console.log(mappedData)

  return (
    <>
    <OrbitControls maxDistance={12} position={[0,11,0]} minDistance={10.2} zoomSpeed={0.05} panSpeed={0.01} rotateSpeed={0.05}/>
    {mappedData}
    <mesh rotation={[0, (-Math.PI / 2), 0]} onClick={() => console.log("Clicked!")}>
        <sphereGeometry args={[radius, 100, 100]}/>
        <meshStandardMaterial attach="material" roughness={1} displacementScale={0.1} map={map} displacementMap={displacement}  />
    </mesh>
    </>
  )
}
