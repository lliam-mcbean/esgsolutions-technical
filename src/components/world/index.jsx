import React, { useEffect, useState } from 'react'
import data from '../../data/earthquakes.json'
import { OrbitControls, useTexture } from '@react-three/drei'
import Quake from './quake'
import { useInfo } from '../../context/info'


export default function World() {
    const [map, displacement, borders] = useTexture(['/textures/earthmap.jpg', '/textures/occulantearth.jpg', '/textures/countries.png'])
    const radius = 10
    const [mappedData, setMappedData] = useState([])
    const {earthquakeRange, displacementRange, worldOpacity, worldScale} = useInfo()

  useEffect(() => {
        setMappedData(data.map((el, i) => {
        const newLat = el["Latitude"] * (Math.PI / 180);
        const newLong = el["Longitude"] * (Math.PI / 180);
        const newRadius = ((6371 - el["Depth_km"]) / 6371) * radius
      
        const z = Math.cos(newLat) * Math.cos(newLong) * newRadius;
        const x = Math.cos(newLat) * Math.sin(newLong) * newRadius;
        const y = Math.sin(newLat) * newRadius;

        if (el["ML"] > earthquakeRange) {
          return (
            <Quake key={`earthquake-${i}`} position={[x,y,z]} location={el['Location']} amplitude={el["ML"]} coords={[el["Latitude"], el["Longitude"]]}/>
        )
        }
  }))

  }, [earthquakeRange])

  return (
    <>
    <OrbitControls position={[0,11,0]} minDistance={10.2} zoomSpeed={0.05} panSpeed={0.01} rotateSpeed={0.05}/>
    {mappedData}
    <mesh rotation={[0, (-Math.PI / 2), 0]} scale={worldScale} onClick={() => console.log("Clicked!")}>
        <sphereGeometry args={[radius, 500, 500]}/>
        <meshStandardMaterial attach="material" roughness={1} transparent opacity={worldOpacity} displacementScale={displacementRange} map={map} displacementMap={displacement}  />
    </mesh>
    </>
  )
}
