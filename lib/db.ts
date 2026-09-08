import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

export interface BreachData {
  id: string;
  txHash: string;
  agentId: string;
  agentName: string;
  hunterAddress: string;
  bountyEarned: number;
  bountyJail?: number;
  verdict: "BREACH" | "SAFE";
  quorum: string;
  ruleViolated: string;
  attackPrompt: string;
  agentReply: string;
  validatorsJson: string;
  createdAt: number;
}

export interface HunterData {
  address: string;
  handle: string;
  name: string;
  breachesCount: number;
  totalEarned: number;
  successRate: string;
  lastActive: number;
}

interface StorageState {
  breaches: BreachData[];
  hunters: HunterData[];
}

const DEFAULT_HUNTERS: HunterData[] = [];

let inMemoryState: StorageState = {
  breaches: [],
  hunters: [],
};

function getStoragePath(): string | null {
  try {
    const dataDir = resolve(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    return join(dataDir, "jailbreak_store.json");
  } catch {
    return null;
  }
}

function loadFromDisk(): void {
  const filePath = getStoragePath();
  if (!filePath) return;

  try {
    if (existsSync(filePath)) {
      const data = readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data) as StorageState;
      if (parsed.breaches) inMemoryState.breaches = parsed.breaches;
      if (parsed.hunters) inMemoryState.hunters = parsed.hunters;
    } else {
      saveToDisk();
    }
  } catch {
    // Ignore disk read errors
  }
}

function saveToDisk(): void {
  const filePath = getStoragePath();
  if (!filePath) return;

  try {
    writeFileSync(filePath, JSON.stringify(inMemoryState, null, 2), "utf-8");
  } catch {
    // Ignore disk write errors in restricted runtimes
  }
}

// Initial load
loadFromDisk();

export function saveBreachRecord(data: Omit<BreachData, "id" | "createdAt">): BreachData {
  loadFromDisk();
  const id = `brc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = Date.now();

  const record: BreachData = {
    ...data,
    id,
    createdAt,
  };

  // Prepend new breach
  inMemoryState.breaches.unshift(record);

  // If breach confirmed, update hunter stats
  if (record.verdict === "BREACH") {
    const existing = inMemoryState.hunters.find(
      (h) => h.address.toLowerCase() === record.hunterAddress.toLowerCase() ||
             h.handle.toLowerCase() === record.hunterAddress.slice(0, 6).toLowerCase()
    );

    if (existing) {
      existing.breachesCount += 1;
      existing.totalEarned += record.bountyEarned;
      existing.lastActive = Date.now();
    } else {
      const shortHandle = record.hunterAddress.length > 8
        ? `${record.hunterAddress.slice(0, 6)}…${record.hunterAddress.slice(-4)}`
        : record.hunterAddress;
      inMemoryState.hunters.push({
        address: record.hunterAddress,
        handle: shortHandle,
        name: shortHandle,
        breachesCount: 1,
        totalEarned: record.bountyEarned,
        successRate: "100%",
        lastActive: Date.now(),
      });
    }
  }

  saveToDisk();
  return record;
}

export function getBreachByTxHash(txHash: string): BreachData | null {
  loadFromDisk();
  const normalized = txHash.toLowerCase().trim();
  const found = inMemoryState.breaches.find(
    (b) => b.txHash.toLowerCase() === normalized ||
           `0x${b.txHash.toLowerCase()}` === normalized ||
           b.txHash.toLowerCase() === `0x${normalized}`
  );
  return found || null;
}

export function getRecentBreaches(limit = 10): BreachData[] {
  loadFromDisk();
  return inMemoryState.breaches.slice(0, limit);
}

export function getLeaderboard(): HunterData[] {
  loadFromDisk();
  // Return hunters sorted by total earned descending
  return [...inMemoryState.hunters].sort((a, b) => b.totalEarned - a.totalEarned);
}
