"use client";

// $JAIL Platform Token storage & onchain sync on GenLayer Bradbury
const JAIL_STORAGE_KEY = "genlayer_jailbreak_jail_balance";

export const JAIL_TOKEN_CONFIG = {
  name: "Jailbreak Arena Token",
  symbol: "JAIL",
  decimals: 18,
  totalSupply: "10000000000", // 10 Billion
  contractAddress: "0xb5F86AC2A9ed63d36792a52f943851EDE2AE516b",
};

export const DEPLOYER_ADDRESS = "0x7da10dee012a89d3bb454047fe29fd130952058e";

export function getLocalJailBalance(address: string | null): number {
  if (typeof window === "undefined" || !address) return 0;
  try {
    const raw = localStorage.getItem(`${JAIL_STORAGE_KEY}_${address.toLowerCase()}`);
    if (raw) return parseFloat(raw);
    // If it's the platform deployer wallet, initialize with 1 Million $JAIL
    if (address.toLowerCase() === DEPLOYER_ADDRESS) {
      setLocalJailBalance(address, 1_000_000);
      return 1_000_000;
    }
    return 0;
  } catch {
    return address.toLowerCase() === DEPLOYER_ADDRESS ? 1_000_000 : 0;
  }
}

export function setLocalJailBalance(address: string | null, amount: number): void {
  if (typeof window === "undefined" || !address) return;
  try {
    localStorage.setItem(`${JAIL_STORAGE_KEY}_${address.toLowerCase()}`, amount.toString());
  } catch {}
}

export function addJailTokens(address: string | null, amount: number): number {
  const current = getLocalJailBalance(address);
  const updated = current + amount;
  setLocalJailBalance(address, updated);
  return updated;
}
