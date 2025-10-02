'use client';

import React from 'react';
import Map, { Marker } from 'react-map-gl/maplibre'; // <-- FIX: Ruta de importación corregida
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';

const santiagoCoordinates = {
    longitude: -70.6404,
    latitude: -33.4383,
};

const mapStyle = {
    version: 8,
    sources: {
        'carto-voyager': {
            type: 'raster',
            tiles: [
                "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            ],
            tileSize: 256,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        }
    },
    layers: [{
        id: 'carto-voyager-layer',
        type: 'raster',
        source: 'carto-voyager',
        minzoom: 0,
        maxzoom: 22
    }]
};

export default function MapLibreMap() {
  return (
    <div className="h-full w-full" style={{ filter: 'saturate(0.75) brightness(1.05) contrast(0.92)' }}>
        <Map
          initialViewState={{
            longitude: santiagoCoordinates.longitude,
            latitude: santiagoCoordinates.latitude,
            zoom: 16,
            pitch: 65,
            bearing: -30,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyle as any}
          interactive={false}
        >
            <Marker 
                longitude={santiagoCoordinates.longitude} 
                latitude={santiagoCoordinates.latitude}
                anchor="bottom"
            >
                <div className="relative flex flex-col items-center">
                    <div className="absolute w-12 h-12 rounded-full bg-[var(--accent-soft)] animate-ping"></div>
                    <MapPin className="w-10 h-10 text-[var(--accent)] fill-cyan-400/30" strokeWidth={1.5}/>
                </div>
            </Marker>
        </Map>
    </div>
  );
}
