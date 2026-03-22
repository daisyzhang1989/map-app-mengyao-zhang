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
  centerAddress: string;
  isAddressLoading: boolean;
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
  centerAddress,
  isAddressLoading,
}: MapViewProps) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1 rounded-lg bg-white px-4 py-2 text-sm shadow-sm">
          <span className="mr-2 font-medium text-gray-700">中心地点:</span>
          <span className="text-gray-600">
            {isAddressLoading
              ? '住所を取得中...'
              : centerAddress || '住所が見つかりません'}
          </span>
        </div>
      </div>

      <div className="h-[500px] w-full overflow-hidden rounded-lg">
        <MapContainer
          center={[center.lat, center.long]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapCenterTracker onCenterChange={onCenterChange} />

          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.long]}
              icon={defaultIcon}
            >
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
      </div>
    </div>
  );
}