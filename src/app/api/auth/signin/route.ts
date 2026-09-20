import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword, signToken } from "@/lib/auth";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = SignInSchema.parse(body);

    const user = await db.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isKycVerified: user.isKycVerified,
      },
      success: true,
    });

    response.cookies.set("fundkaro_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Sign-in error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
