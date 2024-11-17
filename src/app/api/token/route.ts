// app/api/token/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code } = body;
  try {
    if (!code) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    return NextResponse.json({
      access_token:
        'eyJpc3MiOiJodHRwczovL3d3dy5xdWVzdGlvbnByby5jb20vIiwiZXhwIjoxNzMxNzgwMDg5LCJwYXlsb2FkIjoie1wibGFzdE5hbWVcIjpcIkJhZGFseWFuXCIsXCJpbml0aWFsc1wiOlwiQUJcIixcInByb2ZpbGVQaWNcIjpcImh0dHBzOi8vd3d3LnF1ZXN0aW9ucHJvLmNvbS9xcF91c2VyaW1hZ2VzL3N1Yi04LzUzNzYwNTUvaW1hZ2VzLnBuZ1wiLFwiaXNBZG1pblwiOnRydWUsXCJsYW5ndWFnZUNvZGVcIjpcImVuXCIsXCJ1c2VySURcIjo1Mzc2MDU1LFwicHJpbWFyeVVzZXJBUElLZXlcIjpcImQzNGMxNmYzLWRkY2YtNGJlNC04NWZmLWM2MmM4OGE4YzkzOVwiLFwib3JnSURcIjo1MjQzMzY2LFwiaXNQYXJ0bmVyXCI6ZmFsc2UsXCJ1c2VyQXBJS2V5XCI6XCJkMzRjMTZmMy1kZGNmLTRiZTQtODVmZi1jNjJjODhhOGM5MzlcIixcImZpcnN0TmFtZVwiOlwiQW5uaWVcIixcImVtYWlsQWRkcmVzc1wiOlwiYW5pLmJhZGFseWFuQHF1ZXN0aW9ucHJvLmNvbVwiLFwiZGVmYXVsdFByb2R1Y3RVcG9uTG9naW5cIjpcIkxhc3QgVXNlZFwifSIsImlhdCI6MTczMTc3NzIwOSwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL3d3dy5xdWVzdGlvbnByby5jb20vIn0.j2ADgGaoopjbGWNvPc9qIV8Y95RNBw5dj2sh1n6i-UslFAng8B7IPXy_tRnUqkxL-Nz5X8ldw4l2UUc6puKqwuSgVP7or9V_C_C9VNuk15kPvDN9_5Uvqu0W83pvoftpJ0bu8SAJ2HAZVBAdhppP8i0oMGjkdjywvqbpJgUowGBydKyCyMBcemh-YqVvDHqPiFWRMkiKbc0eCIYWSJj9T-vWR1F98q_llgjqZov2kQs4c1ed__XtS8nyDo_8ivsb1oqFSr5FkzeaXIoEm5jlN1RpRz8uKYg7MUFWoJjNlNFoH5iZdYZgerAiS0D4SsfXj3dnoAIAcyZrN1EbK_jhWQ',
      token_type: 'Bearer',
      expires_in: 3600,
    });
  } catch (error) {
    console.log(error, 'error');
    return NextResponse.json(
      { error: 'Token exchange failed', details: error.response?.data || error.message },
      { status: 500 },
    );
  }
}
