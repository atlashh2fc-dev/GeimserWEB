'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Arreglo para los iconos de Leaflet que ya teníamos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Tipos para las props del componente
interface Office {
  city: string;
  coordinates: { lat: number, lng: number };
}

interface InteractiveMapProps {
  offices: Office[];
  selectedOffice: number;
  onMarkerClick: (index: number) => void;
}

// Hook para controlar el mapa
const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Componente del mapa
export default function InteractiveMap({ offices, selectedOffice, onMarkerClick }: InteractiveMapProps) {
  const activeOffice = offices[selectedOffice];

  return (
    <MapContainer 
        center={[activeOffice.coordinates.lat, activeOffice.coordinates.lng]} 
        zoom={11} 
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{filter: 'grayscale(1) invert(1) brightness(0.9) contrast(0.9)'}}
    >
        <ChangeView center={[activeOffice.coordinates.lat, activeOffice.coordinates.lng]} zoom={11} />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {offices.map((office, index) => (
           <Marker 
              key={index} 
              position={[office.coordinates.lat, office.coordinates.lng]}
              eventHandlers={{ click: () => onMarkerClick(index) }}
           />
        ))}
    </MapContainer>
  );
}