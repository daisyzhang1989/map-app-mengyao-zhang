export type Spot = {
  id: number;
  name: string;
  category: string;
  lat: number;
  long: number;
  address: string;
};

export type MapCenter = {
  lat: number;
  long: number;
};

const BASE_URL = 'http://localhost:3001';

export async function fetchSpots(params: {
  lat: number;
  long: number;
  radiusKm: number;
}): Promise<Spot[]> {
  const searchParams = new URLSearchParams({
    lat: String(params.lat),
    long: String(params.long),
    radiusKm: String(params.radiusKm),
  });

  const response = await fetch(`${BASE_URL}/spots?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('スポット一覧の取得に失敗しました');
  }

  return response.json();
}

export async function reverseGeocode(params: {
  lat: number;
  long: number;
}): Promise<{ address: string }> {
  const searchParams = new URLSearchParams({
    lat: String(params.lat),
    long: String(params.long),
  });

  const response = await fetch(
    `${BASE_URL}/geocode/reverse?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error('住所の取得に失敗しました');
  }

  const data = await response.json();

  return {
    address: data.address ?? '',
  };
}