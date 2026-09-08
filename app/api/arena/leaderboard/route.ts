import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/db";

export async function GET() {
  try {
    const hunters = getLeaderboard();
    const formatted = hunters.map((h, i) => ({
      rank: String(i + 1).padStart(2, "0"),
      handle: h.handle,
      name: h.name,
      breaches: h.breachesCount,
      earned: h.totalEarned > 0 ? `${h.totalEarned.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $JAIL` : "—",
      success: h.successRate,
      address: h.address,
      isCurrent: false,
    }));

    return NextResponse.json({ leaderboard: formatted });
  } catch (error: any) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch leaderboard" }, { status: 500 });
  }
}
