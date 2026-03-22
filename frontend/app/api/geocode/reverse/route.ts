import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.BACKEND_API_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: 'BACKEND_API_BASE_URL is not defined', address: '' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;

  try {
    const response = await fetch(
      `${baseUrl}/geocode/reverse?${searchParams.toString()}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to reverse geocode', address: '' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      address: data.address ?? '',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal server error', address: '' },
      { status: 500 }
    );
  }
}