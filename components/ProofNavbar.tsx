"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ContractModal } from "@/components/ContractModal";
import { WalletConnectButton } from "@/components/WalletConnectButton";

export function ProofNavbar() {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  return (
    <>
      <nav className="nav-container">
        <Link className="brand-logo" href="/" style={{ textDecoration: "none" }}>
          <BrandLogo />
        </Link>

        <div className="nav-links">
          <Link href="/#arena">Arena</Link>
          <Link href="/#guide">Guide</Link>
          <Link href="/#leaderboard">Hunters</Link>
          <button
            type="button"
            className="nav-contract-link"
            onClick={() => setIsContractModalOpen(true)}
            title="Inspect GenLayer Intelligent Contract"
          >
            Contract
          </button>
          <a
            href="https://testnet-faucet.genlayer.foundation/"
            target="_blank"
            rel="noreferrer"
            title="Claim free testnet $GEN tokens from official GenLayer Faucet"
          >
            Faucet ↗
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/" className="btn-primary" style={{ padding: "8px 18px", fontSize: "12px", textDecoration: "none" }}>
            <span>← Back to Arena</span>
          </Link>
          <WalletConnectButton />
        </div>
      </nav>

      <ContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
      />
    </>
  );
}
