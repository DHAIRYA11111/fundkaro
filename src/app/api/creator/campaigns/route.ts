import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "creator" && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const campaigns = await db.campaign.findMany({
      where: { creatorId: user.id },
      include: {
        rewards: true,
        _count: { select: { pledges: true, comments: true } },
        pledges: {
          where: { paymentStatus: "SUCCESS" },
          select: { amount: true, tipAmount: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const stats = campaigns.map((c) => ({
      ...c,
      totalCollected: c.pledges.reduce((sum, p) => sum + p.amount + p.tipAmount, 0),
      percentFunded: c.goalAmount > 0 ? Math.round((c.raisedAmount / c.goalAmount) * 100) : 0,
    }));

    return NextResponse.json({ campaigns: stats });
  } catch (err) {
    console.error("Creator campaigns GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
