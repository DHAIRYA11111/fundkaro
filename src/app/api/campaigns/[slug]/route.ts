import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const campaign = await db.campaign.findUnique({
      where: { slug },
      include: {
        creator: {
          select: { id: true, name: true, avatar: true, isKycVerified: true, createdAt: true },
        },
        rewards: { orderBy: { pledgeAmount: "asc" } },
        updates: { orderBy: { publishedAt: "desc" } },
        comments: {
          where: { parentId: null },
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
          take: 20,
        },
        _count: { select: { pledges: true } },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ campaign });
  } catch (err) {
    console.error("Campaign GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const campaign = await db.campaign.findUnique({ where: { slug } });
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    if (campaign.creatorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    // Only allow updating safe fields
    const allowedFields = ["title", "tagline", "description", "story", "coverImage", "videoUrl", "tags"];
    const updateData: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) {
        updateData[key] = key === "tags" ? JSON.stringify(body[key]) : body[key];
      }
    }

    const updated = await db.campaign.update({ where: { slug }, data: updateData });
    return NextResponse.json({ campaign: updated });
  } catch (err) {
    console.error("Campaign PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
