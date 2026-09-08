import { notFound } from "next/navigation";
import { getBreachByTxHash } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo, XShareButton } from "@/components/BrandLogo";
import { ProofNavbar } from "@/components/ProofNavbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ txHash: string }>;
}): Promise<Metadata> {
  const { txHash } = await params;
  const breach = getBreachByTxHash(txHash);

  if (!breach) {
    return {
      title: "Proof Not Found · Jailbreak Arena",
      description: "Cryptographic jailbreak proof not found on GenLayer.",
    };
  }

  return {
    title: `Jailbreak Proof ${breach.txHash.slice(0, 10)}… · ${breach.agentName} | Jailbreak Arena`,
    description: `Verified GenLayer consensus proof: ${breach.hunterAddress} successfully breached ${breach.agentName} for ${breach.bountyEarned} GEN on Jailbreak Arena.`,
    metadataBase: new URL("https://jailbreak-arena.vercel.app"),
    openGraph: {
      title: `Jailbreak Proof: ${breach.agentName} Breached`,
      description: `GenLayer 5/5 validator quorum confirmed policy breach for ${breach.bountyEarned} GEN bounty.`,
      images: ["/og.png"],
      url: `https://jailbreak-arena.vercel.app/proof/${txHash}`,
    },
  };
}

export default async function ProofPage({
  params,
}: {
  params: Promise<{ txHash: string }>;
}) {
  const { txHash } = await params;
  const breach = getBreachByTxHash(txHash);

  if (!breach) {
    return (
      <main className="proof-page-wrapper">
        <ProofNavbar />

        <div className="proof-container" style={{ textAlign: "center", padding: "80px 20px" }}>
          <span className="rule-badge" style={{ color: "var(--crimson)" }}>GENLAYER QUERY ERROR</span>
          <h1 style={{ fontSize: "32px", margin: "16px 0", textTransform: "uppercase" }}>Proof Certificate Not Found</h1>
          <p style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)", maxWidth: "500px", margin: "0 auto 32px" }}>
            The requested transaction receipt ({txHash}) was not found in the GenLayer consensus archive.
          </p>
          <Link href="/" className="btn-primary">
            <span>Enter Jailbreak Arena</span>
          </Link>
        </div>
      </main>
    );
  }

  let validators: any[] = [];
  try {
    validators = JSON.parse(breach.validatorsJson);
  } catch {
    validators = [];
  }

  const dateStr = new Date(breach.createdAt).toUTCString();

  return (
    <main className="proof-page-wrapper">
      {/* Navigation */}
      <ProofNavbar />

      <section className="proof-container">
        {/* Certificate Header Badge */}
        <div className="proof-badge-bar">
          <span className="pulsing-dot" />
          <span>GENLAYER EQUIVALENCE CONSENSUS CERTIFICATE // BLOCKCHAIN PROOF</span>
        </div>

        <div className="proof-header-card">
          <div className="proof-header-content">
            <span className="section-label">CRYPTOGRAPHIC RECEIPT</span>
            <h1 className="proof-title">
              {breach.verdict === "BREACH" ? "Verified Policy Breach" : "Verified Defense Confirmation"}
            </h1>
            <p className="proof-desc">
              Settled by GenLayer decentralized non-deterministic LLM consensus. Verified onchain under the Equivalence Principle.
            </p>
          </div>

          <div className="proof-status-pill">
            <span className="proof-status-tag">
              {breach.verdict === "BREACH" ? "SECURITY BYPASS CONFIRMED" : "DEFENSE UPHELD"}
            </span>
            <div className="proof-payout-amount">
              {breach.bountyEarned > 0 ? (
                <>
                  <strong>{breach.bountyEarned} GEN</strong>
                  {breach.bountyJail && breach.bountyJail > 0 ? (
                    <small>+ {(breach.bountyJail).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $JAIL PAID</small>
                  ) : (
                    <small>BOUNTY PAID</small>
                  )}
                </>
              ) : (
                <>
                  <strong style={{ color: "#ef4444" }}>{(breach.bountyJail || 25000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  <small>$JAIL REWARD PAID</small>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Telemetry Key-Value Grid */}
        <div className="proof-meta-grid">
          <div className="proof-meta-card">
            <span className="proof-meta-label">TRANSACTION HASH</span>
            <code className="proof-hash-code">{breach.txHash}</code>
          </div>

          <div className="proof-meta-card">
            <span className="proof-meta-label">TARGET AGENT</span>
            <strong className="proof-meta-val">{breach.agentName}</strong>
          </div>

          <div className="proof-meta-card">
            <span className="proof-meta-label">HUNTER WALLET</span>
            <code className="proof-hash-code">{breach.hunterAddress}</code>
          </div>

          <div className="proof-meta-card">
            <span className="proof-meta-label">CONSENSUS QUORUM</span>
            <strong className="proof-meta-val" style={{ color: "var(--emerald)" }}>{breach.quorum} VALIDATORS</strong>
          </div>

          <div className="proof-meta-card" style={{ gridColumn: "1 / -1" }}>
            <span className="proof-meta-label">CONSTITUTION VIOLATION DETECTED</span>
            <strong className="proof-meta-val" style={{ color: "var(--crimson)" }}>{breach.ruleViolated}</strong>
          </div>
        </div>

        {/* Public Attack Transcript */}
        <div className="proof-transcript-box">
          <div className="transcript-box-header">
            <span className="section-label" style={{ margin: 0 }}>PUBLIC AUDIT TRANSCRIPT // VERIFICATION ARTIFACT</span>
            <span className="mono" style={{ fontSize: "11px", color: "var(--text-dim)" }}>STAMP: {dateStr}</span>
          </div>

          <div className="transcript-block">
            <div className="transcript-role hunter-role">
              <span>HUNTER INJECTION VECTOR ({breach.hunterAddress.slice(0, 10)}…)</span>
            </div>
            <pre className="transcript-content">{breach.attackPrompt}</pre>
          </div>

          <div className="transcript-block">
            <div className="transcript-role agent-role">
              <span>TARGET AGENT RESPONSE ({breach.agentName})</span>
            </div>
            <pre className="transcript-content agent-output">{breach.agentReply}</pre>
          </div>
        </div>

        {/* 5 Validator Consensus Details */}
        <div className="proof-validators-section">
          <div className="section-label" style={{ marginBottom: "16px" }}>
            GENLAYER DECENTRALIZED JURY VOTES ({validators.length} NODES ARBITRATED)
          </div>

          <div className="proof-validators-grid">
            {validators.map((v: any, idx: number) => (
              <div key={v.validatorId || idx} className="proof-validator-card">
                <div className="validator-card-head">
                  <span className="mono" style={{ fontWeight: 800, color: "var(--text-main)" }}>
                    NODE // {v.validatorId || `V${idx + 1}`}
                  </span>
                  <span className={`verdict-tag ${v.verdict === "BREACH" ? "breach" : "safe"}`}>
                    {v.verdict}
                  </span>
                </div>
                <div className="validator-card-body">
                  <div style={{ fontSize: "11px", color: "var(--text-dim)", marginBottom: "4px" }}>
                    SEVERITY: <strong style={{ color: "var(--crimson)" }}>{v.severity || "CRITICAL"}</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-main)", lineHeight: 1.4 }}>
                    {v.reason || "Validator confirmed target agent output violated safety rules."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="proof-actions-bar">
          <Link href="/" className="btn-primary">
            <span>Test Another Attack in Arena</span>
            <span className="mono">↗</span>
          </Link>
          <XShareButton
            agentName={breach.agentName}
            bounty={breach.bountyEarned}
            txHash={breach.txHash}
            className="btn-pixel-black"
          />
          <a
            href={
              breach.txHash && breach.txHash.startsWith("0x")
                ? `https://explorer-bradbury.genlayer.com/tx/${breach.txHash}`
                : "https://explorer-bradbury.genlayer.com/transactions"
            }
            target="_blank"
            rel="noreferrer"
            className="btn-pixel-white"
            title={`View transaction ${breach.txHash} on official GenLayer Explorer`}
          >
            <span>View on GenLayer Explorer ↗</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-wrap" style={{ marginTop: "80px" }}>
        <Link className="brand-logo" href="/" style={{ textDecoration: "none" }}>
          <BrandLogo />
        </Link>
        <div>GENLAYER DECENTRALIZED CONSENSUS · PROOF ID: {breach.id}</div>
        <div style={{ color: "var(--crimson)", fontWeight: 700 }}>IMMUTABLE ARBITRATION</div>
      </footer>
    </main>
  );
}
