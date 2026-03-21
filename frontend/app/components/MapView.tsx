'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultIcon } from '@/lib/leaflet';

type Spot = {
  id: number;
  name: string;
  category: string;
  lat: number;
  long: number;
  address: string;
};

export default function MapView({ spots }: { spots: Spot[] }) {
  const defaultCenter: [number, number] = [35.681236, 139.767125];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.long]} icon={defaultIcon}>
          <Popup>
            <div>
              <div>{spot.name}</div>
              <div>{spot.category}</div>
              <div>{spot.address}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}