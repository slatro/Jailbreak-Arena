import { NextResponse } from "next/server";
import { saveBreachRecord, getRecentBreaches } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      txHash,
      agentId,
      agentName,
      hunterAddress,
      bountyEarned,
      bountyJail,
      verdict,
      quorum,
      ruleViolated,
      attackPrompt,
      agentReply,
      validators,
    } = body;

    if (!txHash || !agentId || !attackPrompt || !agentReply) {
      return NextResponse.json({ error: "Missing required breach data" }, { status: 400 });
    }

    const record = saveBreachRecord({
      txHash,
      agentId,
      agentName: agentName || agentId,
      hunterAddress: hunterAddress || "0x71F2...2A09",
      bountyEarned: Number(bountyEarned) || 0,
      bountyJail: Number(bountyJail) || 0,
      verdict: verdict || "BREACH",
      quorum: quorum || "5/5",
      ruleViolated: ruleViolated || "Security Policy Breach",
      attackPrompt,
      agentReply,
      validatorsJson: JSON.stringify(validators || []),
    });

    return NextResponse.json({ success: true, breach: record });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to save breach" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const breaches = getRecentBreaches(limit);
    return NextResponse.json({ breaches });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch breaches" }, { status: 500 });
  }
}
