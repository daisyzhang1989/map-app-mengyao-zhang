'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
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

type MapCenter = {
  lat: number;
  long: number;
};

type MapViewProps = {
  spots: Spot[];
  center: MapCenter;
  onCenterChange: (center: MapCenter) => void;
};

function MapCenterTracker({
  onCenterChange,
}: {
  onCenterChange: (center: MapCenter) => void;
}) {
  useMapEvents({
    moveend: (event) => {
      const map = event.target;
      const center = map.getCenter();

      onCenterChange({
        lat: center.lat,
        long: center.lng,
      });
    },
  });

  return null;
}

export default function MapView({
  spots,
  center,
  onCenterChange,
}: MapViewProps) {
  return (
    <MapContainer
      center={[center.lat, center.long]}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenterTracker onCenterChange={onCenterChange} />

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