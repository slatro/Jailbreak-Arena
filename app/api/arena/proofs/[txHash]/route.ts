import { NextResponse } from "next/server";
import { getBreachByTxHash } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ txHash: string }> }
) {
  try {
    const { txHash } = await params;
    if (!txHash) {
      return NextResponse.json({ error: "txHash is required" }, { status: 400 });
    }

    const breach = getBreachByTxHash(txHash);
    if (!breach) {
      return NextResponse.json({ error: "Proof not found on GenLayer" }, { status: 404 });
    }

    let validators = [];
    try {
      validators = JSON.parse(breach.validatorsJson);
    } catch {
      validators = [];
    }

    return NextResponse.json({
      breach: {
        ...breach,
        validators,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
