'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchSpots, reverseGeocode, type Spot, type MapCenter } from '@/lib/api';

const MapView = dynamic(() => import('./components/MapView'), {
  ssr: false,
});

const MAP_CENTER_DEBOUNCE_MS = 1000;

export default function Home() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [radiusKm, setRadiusKm] = useState(3);

  const [mapCenter, setMapCenter] = useState<MapCenter>({
    lat: 35.681236,
    long: 139.767125,
  });

  const [pendingCenter, setPendingCenter] = useState<MapCenter>({
    lat: 35.681236,
    long: 139.767125,
  });

  const [centerAddress, setCenterAddress] = useState('');
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setMapCenter(pendingCenter);
    }, MAP_CENTER_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [pendingCenter]);

  useEffect(() => {
    fetchSpots({
      lat: mapCenter.lat,
      long: mapCenter.long,
      radiusKm,
    })
      .then((data) => setSpots(data))
      .catch((error) => console.error(error));
  }, [mapCenter, radiusKm]);

  useEffect(() => {
    setIsAddressLoading(true);

    reverseGeocode({
      lat: mapCenter.lat,
      long: mapCenter.long,
    })
      .then((data) => {
        setCenterAddress(data.address);
      })
      .catch((error) => {
        console.error(error);
        setCenterAddress('');
      })
      .finally(() => {
        setIsAddressLoading(false);
      });
  }, [mapCenter]);

  return (
    <main style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '20px',
        }}
      >
        <div className="search-radius-container" style={{ marginBottom: 0 }}>
          <label className="search-radius-label">検索範囲：</label>
          <input
            className="search-radius-input"
            type="number"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            min="1"
            max="50"
            placeholder="半径を入力"
          />
          <span className="search-radius-unit">km</span>
        </div>
      </div>

      <MapView
        spots={spots}
        center={mapCenter}
        onCenterChange={setPendingCenter}
        centerAddress={centerAddress}
        isAddressLoading={isAddressLoading}
      />

      <h2 style={{ marginTop: '20px' }}>スポット一覧</h2>
      <ul className="spots-list">
        {spots.map((spot) => (
          <li className="spot-item" key={spot.id}>
            {spot.name} / {spot.category} / {spot.address}
          </li>
        ))}
      </ul>
    </main>
  );
}