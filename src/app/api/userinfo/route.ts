// app/api/userinfo/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  const authorizationHeader = req.headers.get('authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Split the header value and extract the token after "Bearer "
  const parts = authorizationHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  const token = parts[1];
  console.log(token, 'token');
  if (!token) {
    return res.status(401).json({ error: 'Bearer token missing' });
  }

  try {
    return NextResponse.json({
      id: 1,
      name: 'poxos',
      email: 'poxos@poxos.com',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user info', details: error.response?.data || error.message },
      { status: 500 },
    );
  }
}
