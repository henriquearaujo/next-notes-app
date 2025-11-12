export async function GET() {
  return new Response(JSON.stringify({ message: 'Olá, Next!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
