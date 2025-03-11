import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fund-for-found-y4d1.onrender.com/brand', {
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}
