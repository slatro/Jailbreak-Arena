"use client";

import { useState, useEffect, useRef } from "react";
import { connectBrowserWallet, fetchWalletBalance, fetchJailBalance, WalletState } from "@/lib/wallet";

interface WalletConnectButtonProps {
  onWalletChange?: (wallet: WalletState) => void;
}

export function WalletConnectButton({ onWalletChange }: WalletConnectButtonProps) {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    displayAddress: "Connect Wallet",
    balance: "0 GEN",
    jailBalance: "0 JAIL",
    chainId: null,
    isRealWallet: false,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-reconnect if already approved
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum
        .request({ method: "eth_accounts" })
        .then(async (accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            const addr = accounts[0];
            const bal = await fetchWalletBalance(addr);
            const jBal = await fetchJailBalance(addr);
            const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
            const st: WalletState = {
              connected: true,
              address: addr,
              displayAddress: `${addr.slice(0, 6)}…${addr.slice(-4)}`,
              balance: bal,
              jailBalance: jBal,
              chainId,
              isRealWallet: true,
            };
            setWallet(st);
            onWalletChange?.(st);
          }
        })
        .catch(() => {});
    }
  }, [onWalletChange]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  async function handleConnect() {
    try {
      const state = await connectBrowserWallet();
      setWallet(state);
      onWalletChange?.(state);
    } catch (e) {
      console.warn("Wallet connect failed:", e);
    }
  }

  function handleButtonClick() {
    if (!wallet.connected) {
      handleConnect();
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  }

  function handleCopy() {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  }

  function handleDisconnect() {
    const disconnectedState: WalletState = {
      connected: false,
      address: null,
      displayAddress: "Connect Wallet",
      balance: "0 GEN",
      jailBalance: "0 JAIL",
      chainId: null,
      isRealWallet: false,
    };
    setWallet(disconnectedState);
    setIsDropdownOpen(false);
    onWalletChange?.(disconnectedState);
  }

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        type="button"
        className={wallet.connected ? "wallet-btn connected" : "wallet-btn"}
        onClick={handleButtonClick}
        title={wallet.connected ? `Connected: ${wallet.address} (click to manage)` : "Connect MetaMask, Rabby, or Web3 wallet"}
      >
        {wallet.connected ? (
          <>
            <span className="wallet-status-dot" />
            <span className="wallet-btn-address">{wallet.displayAddress}</span>
            <span className="wallet-btn-balance">{wallet.balance}</span>
            <span className="wallet-btn-jail">{wallet.jailBalance}</span>
            <span className="wallet-btn-chevron">{isDropdownOpen ? "▲" : "▼"}</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: "13px" }}>⚡</span>
            <span>Connect Wallet</span>
          </>
        )}
      </button>

      {wallet.connected && isDropdownOpen && (
        <div className="wallet-dropdown-box">
          <div className="wallet-dropdown-header">
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="pulsing-dot" style={{ width: "6px", height: "6px", background: "#10b981" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#065f46" }}>
                GENLAYER BRADBURY
              </span>
            </div>
            <span className="mono" style={{ fontSize: "9px", color: "#64748b" }}>
              {wallet.isRealWallet ? "WEB3" : "DEMO"}
            </span>
          </div>

          <div className="wallet-dropdown-account">
            <span style={{ fontSize: "9px", color: "#64748b", fontWeight: 700 }}>ACCOUNT</span>
            <strong className="mono" style={{ fontSize: "12px", color: "#0f172a" }}>
              {wallet.displayAddress}
            </strong>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "4px" }}>
              <span style={{ fontSize: "10px", color: "var(--emerald-deep)", fontWeight: 700 }}>
                Balance: {wallet.balance}
              </span>
              <span style={{ fontSize: "10px", color: "#b91c1c", fontWeight: 800 }}>
                $JAIL Tokens: {wallet.jailBalance}
              </span>
            </div>
          </div>

          <div className="wallet-dropdown-actions">
            <button
              type="button"
              className={`wallet-dropdown-action-btn ${isCopied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              <span>{isCopied ? "Copied!" : "Copy Address"}</span>
            </button>

            <button
              type="button"
              className="wallet-dropdown-action-btn disconnect"
              onClick={handleDisconnect}
            >
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
