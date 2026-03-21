'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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

const MapView = dynamic(() => import('./components/MapView'), {
  ssr: false,
});


export default function Home() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [radiusKm, setRadiusKm] = useState(3);
  const [mapCenter, setMapCenter] = useState<MapCenter>({
  lat: 35.681236,
  long: 139.767125,
});

  useEffect(() => {
    fetch(`http://localhost:3001/spots?lat=${mapCenter.lat}&long=${mapCenter.long}&radiusKm=${radiusKm}`)
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((error) => console.error(error));
  }, [mapCenter, radiusKm]);

  return (
    <main style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>スポットマップ</h1>
        <div className="search-radius-container" style={{ marginBottom: 0 }}>
          <label className="search-radius-label">
            検索範囲：
          </label>
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
      <MapView spots={spots} center={mapCenter} onCenterChange={setMapCenter} />
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