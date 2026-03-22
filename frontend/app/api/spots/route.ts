import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.BACKEND_API_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: 'BACKEND_API_BASE_URL is not defined' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;

  try {
    const response = await fetch(
      `${baseUrl}/spots?${searchParams.toString()}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch spots' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}