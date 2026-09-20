import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const CommentSchema = z.object({
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { slug } = await params;
    const campaign = await db.campaign.findUnique({ where: { slug }, select: { id: true } });
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    const body = await req.json();
    const data = CommentSchema.parse(body);

    const comment = await db.comment.create({
      data: {
        campaignId: campaign.id,
        userId: user.id,
        content: data.content,
        parentId: data.parentId ?? null,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Comment POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
