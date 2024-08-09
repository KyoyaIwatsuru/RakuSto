import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = 'http://34.85.99.164:8000/recipes/';
    const apiRes = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!apiRes.ok) {
      throw new Error('データの取得に失敗しました');
    }

    const apiData = await apiRes.json();
    return NextResponse.json(apiData);
  } catch (error) {
    return NextResponse.json(error);
  }
}