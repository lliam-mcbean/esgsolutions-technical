import React from 'react'
import { useInfo } from '../../context/info'

export default function Info() {
    const {info, earthquakeRange, setEarthquakeRange, setDisplacementRange, displacementRange, worldOpacity, setWorldOpacity, setWorldScale, worldScale} = useInfo()

  return (
    <div>
    <div className='fixed top-0 right-0 p-4 bg-white opacity-80 rounded'>
      {info ? <>
        <div>
            {`Location: ${info.location}`}
        </div>
        <div>
            {`Coords: ${info.coords}`}
        </div>
        <div>
            {`Depth: ${info.depth}km`}
        </div>
        <div>
            {`Amplitude: ${info.amplitude}`}
        </div>
      </> : 'Select an earthquake site'}
    </div>
        <div className='fixed left-0 top-0 text-white'>
            <div>Earthquake Range</div>
            <input type="range" value={earthquakeRange} step={0.1} min={0} max={5} onChange={(e) => {
                setEarthquakeRange(e.target.value)
            }}/>
            <div>Displacement Range</div>
            <input type="range" value={displacementRange} step={0.1} min={0} max={2} onChange={(e) => {
                setDisplacementRange(e.target.value)
            }}/>
            <div>World Opacity</div>
            <input type="range" value={worldOpacity} step={0.1} min={0.2} max={1} onChange={(e) => {
                setWorldOpacity(e.target.value)
            }}/>
            <div>World Scale</div>
            <input type="range" value={worldScale} step={0.001} min={0.95} max={1} onChange={(e) => {
                setWorldScale(e.target.value)
            }}/>
        </div>
    </div>
  )
}
