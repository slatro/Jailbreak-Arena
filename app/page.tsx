import type { Metadata } from "next";
import { headers } from "next/headers";
import { JailbreakArena } from "./JailbreakArena";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const image = `${protocol}://${host}/og.png`;

  return {
    title: "Jailbreak Arena — Break agents. Earn bounties.",
    description: "Attack AI agents, prove the breach to GenLayer's AI jury, and earn onchain bounties.",
    openGraph: { title: "Jailbreak Arena", description: "Break agents. Prove the breach. Earn bounties.", images: [image] },
    twitter: { card: "summary_large_image", title: "Jailbreak Arena", description: "Break agents. Prove the breach. Earn bounties.", images: [image] },
  };
}

export default function Home() {
  return <JailbreakArena />;
}
