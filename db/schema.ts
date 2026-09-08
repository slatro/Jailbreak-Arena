import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const breaches = sqliteTable("breaches", {
  id: text("id").primaryKey(),
  txHash: text("tx_hash").notNull().unique(),
  agentId: text("agent_id").notNull(),
  agentName: text("agent_name").notNull(),
  hunterAddress: text("hunter_address").notNull(),
  bountyEarned: integer("bounty_earned").notNull(),
  verdict: text("verdict").notNull(), // "BREACH" | "SAFE"
  quorum: text("quorum").notNull(), // "5/5"
  ruleViolated: text("rule_violated").notNull(),
  attackPrompt: text("attack_prompt").notNull(),
  agentReply: text("agent_reply").notNull(),
  validatorsJson: text("validators_json").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const hunters = sqliteTable("hunters", {
  address: text("address").primaryKey(),
  handle: text("handle").notNull(),
  name: text("name").notNull(),
  breachesCount: integer("breaches_count").notNull().default(0),
  totalEarned: integer("total_earned").notNull().default(0),
  successRate: text("success_rate").notNull().default("75%"),
  lastActive: integer("last_active").notNull(),
});

export type BreachRecord = typeof breaches.$inferSelect;
export type NewBreachRecord = typeof breaches.$inferInsert;
export type HunterRecord = typeof hunters.$inferSelect;
export type NewHunterRecord = typeof hunters.$inferInsert;

