export async function POST(request: Request) {
  const body = await request.json();
  try {
    return new Response(JSON.stringify({ status: 200, ...body, id: 1 }));
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
