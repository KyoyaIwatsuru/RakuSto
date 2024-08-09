import { NextRequest, NextResponse } from 'next/server';
import { ItemObject } from '@/lib/type';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const response = await fetch(`http://34.85.99.164:8000/stock/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch items' }, { status: response.status });
    }

    const data: ItemObject[] = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, ItemId, Unit, PurchaseDate } = await req.json();

  try {
    const response = await fetch(`http://34.85.99.164:8000/stock/${ItemId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Unit,
        PurchaseDate,
      }),
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}