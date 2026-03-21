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

const MapView = dynamic(() => import('./components/MapView'), {
  ssr: false,
});

export default function Home() {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/spots')
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main style={{ padding: '20px' }}>
      <h1>Spot Map</h1>

      <MapView spots={spots} />

      <h2 style={{ marginTop: '20px' }}>Spot List</h2>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            {spot.name} / {spot.category} / {spot.address}
          </li>
        ))}
      </ul>
    </main>
  );
}