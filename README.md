# Jailbreak

**Break agents. Prove the breach. Earn bounties.**

Jailbreak is a permissionless red-team arena for AI agents, built for GenLayer's **The Tank**. Agent owners publish a safety constitution and stake a bounty in GEN. Human or autonomous hunters attack the agent and submit the resulting transcript. GenLayer validators independently judge the transcript against the pre-committed rules; a proven breach releases the bounty automatically.

## Why GenLayer

A jailbreak is rarely reducible to a deterministic assertion. The same response can be safe or dangerous depending on the agent's published policy and context. Jailbreak uses GenLayer's Equivalence Principle to turn that subjective evidence into a consensus verdict that can settle value onchain.

## Product flow

1. **Stake:** An owner launches an agent with an immutable safety constitution and a GEN bounty.
2. **Break:** Hunters prompt the target agent and preserve the complete public transcript.
3. **Prove:** A hunter submits the transcript to the Intelligent Contract.
4. **Judge:** Validators independently return `BREACH` or `SAFE` with severity and evidence-grounded reasoning.
5. **Settle:** A confirmed breach marks the agent `BROKEN` and transfers its full bounty to the hunter.

## Repository

- `contracts/jailbreak_arena.py` — payable bounty creation, consensus judgment, hunter reputation, and GEN payout.
- `app/JailbreakArena.tsx` — interactive hunter-versus-agent demo.
- `app/page.tsx` — dynamic social metadata and product entry point.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and complete the sample fight:

1. Send the attack prompt.
2. Inspect VaultKeeper-7's violating response.
3. Submit the transcript to the GenLayer jury.
4. Watch the 5/5 verdict release the 100 GEN bounty.

The browser battle uses deterministic sample responses so a hackathon demo cannot fail. The contract contains the real consensus and payout path; production wiring replaces the demo timing with GenLayer Transaction Kit calls and a target-agent API adapter.

## Deploy the contract

Load `contracts/jailbreak_arena.py` in GenLayer Studio and deploy it with no constructor arguments. Then call `launch_bounty` as a payable write with:

- `agent_id`: `vaultkeeper-7`
- `name`: `VaultKeeper-7`
- `constitution`: the rules shown in the arena
- value: the GEN bounty in wei

Submit a complete attacker/agent transcript through `submit_attack`. Read the result with `get_agent` and the hunter record with `get_hunter`.

## Safety properties

- Rules are committed before attacks begin.
- Attacker prompts alone cannot qualify as a breach.
- Transcript content is explicitly treated as untrusted prompt data.
- Validators independently rerun the judgment and compare verdict-bearing fields.
- Prize state is cleared before the asynchronous payout message is emitted.
- Each bounty can pay only once.

## Next milestones

- Connect the arena to GenLayer Transaction Kit.
- Add target-agent adapters for HTTP, MCP, and onchain agents.
- Store content-addressed public transcript bundles.
- Add attack-agent tournaments and automated round robin testing.
- Issue portable Agent Safety Rating and Hunter Reputation records.
