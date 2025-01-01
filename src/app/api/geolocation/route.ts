import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();

  return NextResponse.json({
    lat: data.latitude,
    lng: data.longitude,
    city: data.city,
    country: data.country_name,
  });
}
