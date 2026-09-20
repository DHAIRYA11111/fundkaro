import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const pledges = await db.pledge.findMany({
      where: { backerId: user.id, paymentStatus: "SUCCESS" },
      include: {
        campaign: {
          select: {
            id: true,
            slug: true,
            title: true,
            tagline: true,
            coverImage: true,
            raisedAmount: true,
            goalAmount: true,
            status: true,
            endsAt: true,
          },
        },
        rewardTier: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const totalBacked = pledges.reduce((sum, p) => sum + p.amount + p.tipAmount, 0);

    return NextResponse.json({
      pledges,
      stats: {
        totalPledges: pledges.length,
        totalBacked,
        campaignsBacked: new Set(pledges.map((p) => p.campaignId)).size,
      },
    });
  } catch (err) {
    console.error("Backer pledges error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
