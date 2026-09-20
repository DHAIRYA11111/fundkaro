import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET!;

// ── Password helpers ──────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── JWT helpers ───────────────────────────────────────────────────

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

// ── Request helpers ───────────────────────────────────────────────

export async function getCurrentUser(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const cookieHeader = request.headers.get("cookie");

  let token: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else if (cookieHeader) {
    const match = cookieHeader.match(/chandadedo_token=([^;]+)/);
    if (match) token = match[1];
  }

  if (!token) return null;

  try {
    const payload = verifyToken(token);
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        isKycVerified: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export async function requireAuth(request: Request) {
  const user = await getCurrentUser(request);
  if (!user) {
    throw new Response(
      JSON.stringify({ error: "Unauthorized. Please sign in." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  return user;
}

export async function requireCreator(request: Request) {
  const user = await requireAuth(request);
  if (user.role !== "creator" && user.role !== "admin") {
    throw new Response(
      JSON.stringify({ error: "Only creators can perform this action." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }
  return user;
}
