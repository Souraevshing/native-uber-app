import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.EXPO_PUBLIC_POSTGRES_DATABASE_URL!);

/**
 * @description GET DRIVERS
 * @param req Request
 * @returns list of drivers
 */
export async function POST(req: Request) {
  try {
    const res = await sql`SELECT * FROM drivers`;

    return new Response(JSON.stringify({ data: res }), {
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: err }, { status: 500 });
  }
}
