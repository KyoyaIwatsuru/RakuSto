import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601?format=json&genreId=501122&formatVersion=2&applicationId=1055433271013768374';
    const apiRes = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!apiRes.ok) {
      throw new Error('Failed to fetch items');
    }

    const apiData = await apiRes.json();
    return NextResponse.json(apiData);
  } catch (error) {
    return NextResponse.json(error);
  }
}