import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.EXPO_PUBLIC_POSTGRES_DATABASE_URL!);

/**
 * @description CREATE USER
 * @param req Request
 * @returns created user as response
 */
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      clerkId,
    }: { name: string; email: string; clerkId: string } = await req.json();

    //validate all fields are filled
    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "All fields are mandatory" },
        { status: 400 }
      );
    }

    const res = await sql`
        INSERT INTO users (
                name,
                email,
                clerk_id
        ) 
        VALUES (
                ${name},
                ${email},
                ${clerkId}
        );`;

    return new Response(JSON.stringify({ data: res }), {
      status: 201,
    });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: err }, { status: 500 });
  }
}
