// Pre-run 6 payment process. One per kept public node (unique kaspad). Key 16, fee 150 sompi per gram. Counts only.
// Args: --slot i --of N   (node i of the kept list in private/nodes.json)
// Rate: control/PAY-RATE is the desk total; this process sends its even share, paced on the clock (a loop that takes a
// little over a second still sends share per second, not share per loop).
// Each paid coin's change output is re-used at once (spends a mempool parent; never an orphan).
// Pre-run 6 pool rules (locks/LOCKED.md, pre-run 6 lesson; tools/desk/paypool.mjs):
//   - The pool comes from the lane file the runner wrote for this slot (an even deal of the free coins), checked against the
//     node view: a coin spent by a mempool transaction is dropped, an unconfirmed tip of ours is a coin. It is never taken
//     from the confirmed UTXO list alone. Without a lane file: this slot's last snapshot, checked the same way; without
//     that, this slot's deal of the node's free set.
//   - A coin is out of the pool while its payment is in flight. It comes back only as its change tip (OK), or as itself
//     (mempool full, or an rpc error that does not show it spent).
//   - control/PAY-HANDOFF-<n> (or PAY-HANDOFF): finish the batch in flight, write the exact pool to the private handoff
//     file, log PAY_HANDOFF, exit. The runner's repair uses this instead of killing the sender, so no tip is lost.
//   - A snapshot of the pool is written every 5 s, so a crash leaves a pool to check.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const KIT = process.env.STORM_KIT;
const { CFG, to, connect, P, phase, reason, massOf, sleep, END, STOPF } = await import("file:///" + KIT.replace(/\\/g, "/") + "/lib.mjs");
const { keyAddress } = await import("file:///" + KIT.replace(/\\/g, "/") + "/covenant.mjs");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PP = await import("file:///" + path.join(HERE, "paypool.mjs").replace(/\\/g, "/"));
const require = createRequire(import.meta.url);
const k = require(CFG.kaspa_sdk);
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const SLOT = Number(arg("slot")), OF = Number(arg("of"));
const nodes = JSON.parse(fs.readFileSync(P("private", "nodes.json"), "utf8"));
const NODE = nodes[SLOT].url;
const NN = nodes[SLOT].n;                  // local node number for the logs
const KEY = 16, FEE_RATE = 150n;
const lines = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const pk = new k.PrivateKey(lines[KEY]);
const addr = keyAddress(KEY);
let rpc = await connect(NODE, 4);
const lrpc = await connect(CFG.main_node_url, 4);   // lane check and pool view on the desk node
phase(`PAY_START node=${NN} of=${OF} key=16 fee=150`);
const op = PP.op;
const used = new Map();   // outpoint -> ms: a coin this process spent or saw rejected is not reloaded for 120 s
const LANE = P("private", `pool-${NN}.json`), SNAP = P("private", `pool-${NN}.snap.json`), HAND = P("private", `pool-${NN}.handoff.json`);
let pool = [];
async function view() { return PP.nodeView([lrpc, rpc], addr, to, 60000); }
async function load(first) {
  const v = await view(); const now = Date.now();
  for (const [o, t] of used) if (now - t > 120000) used.delete(o);
  let src = "node", cand = null;
  if (first) {
    const lane = PP.readCoins(LANE, addr);
    if (lane && lane.slot === SLOT && lane.of === OF && now - lane.at < 15 * 60000) { src = "lane"; cand = lane.coins; try { fs.renameSync(LANE, LANE + ".used"); } catch {} }
    else { const snap = PP.readCoins(SNAP, addr); if (snap && snap.coins.length) { src = "snap"; cand = snap.coins; } }
  }
  let why = { spent: 0, gone: 0, small: 0 };
  if (cand) { const r = PP.validate(cand, v, now); pool = r.keep.filter((c) => !used.has(op(c))); why = r.why; }
  if (!cand || !pool.length) { src = cand ? src + "+node" : "node"; pool = PP.deal([...PP.freeOf(v).values()].filter((c) => !used.has(op(c))), OF)[SLOT] || []; }
  phase(`PAY_POOL node=${NN} n=${pool.length} from=${src} dropped_spent=${why.spent} dropped_gone=${why.gone} dropped_small=${why.small} free_seen=${PP.freeOf(v).size} mempool_spent_seen=${v.spent.size}`);
}
await load(true);
const rateFile = P("control", "PAY-RATE");
let minute = new Date().toISOString().slice(0, 16);
let ok = 0, attempts = 0, rateRej = 0, full = 0, other = 0, share = 0;
function roll(now) {
  const m = new Date(now).toISOString().slice(0, 16);
  if (m === minute) return;
  fs.appendFileSync(P("logs", `pay-minute-${NN}.log`), `${minute}Z node=${NN} ok=${ok} attempts=${attempts} rate=${rateRej} full=${full} other=${other} share=${share} pool=${pool.length}\n`);
  minute = m; ok = 0; attempts = 0; rateRej = 0; full = 0; other = 0;
}
const payStop = P("control", "PAY-STOP");            // all payment senders (lane, runner)
const myStop = () => P("control", `PAY-STOP-${NN}`);  // this sender only (a rate reject)
const handoff = () => fs.existsSync(P("control", `PAY-HANDOFF-${NN}`)) || fs.existsSync(P("control", "PAY-HANDOFF"));
const bare = (c) => ({ address: c.address, outpoint: c.outpoint, amount: c.amount, scriptPublicKey: c.scriptPublicKey, blockDaaScore: c.blockDaaScore, isCoinbase: false });
let massMax = 0, massN = 0;
let recon = false, laneAt = 0, rateStopped = false, chain = true, fails = 0, snapAt = 0, last = 0, handed = false;
while (Date.now() < END && !fs.existsSync(STOPF) && !fs.existsSync(payStop) && !fs.existsSync(myStop())) {
  if (handoff()) { handed = true; break; }
  const now = Date.now();
  roll(now);
  if (now - snapAt > 5000) { snapAt = now; try { PP.writeCoins(SNAP, pool, { slot: SLOT, of: OF, node: NN }); } catch {} }
  if (now - laneAt > 30000) {
    laneAt = now;
    try {
      const bag = await to(lrpc.getUtxosByAddresses({ addresses: [keyAddress(0)] }), 30000);
      const coins = (bag.entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n);
      const usable = Math.round(coins.reduce((s, e) => s + Number(e.amount) - 3e8, 0) / 1e8);
      if (coins.length < 2500 || usable < 18000) { phase(`PAY_STOP node=${NN} reason=lane`); fs.writeFileSync(payStop, "lane\n"); break; }
    } catch { phase(`PAY_LANE node=${NN} unread`); }
  }
  let total = 0;
  try { total = Number(fs.readFileSync(rateFile, "utf8").trim()) || 0; } catch {}
  share = Math.floor(total / OF) + (SLOT < total % OF ? 1 : 0);
  if (!share) { last = 0; await sleep(500); continue; }
  const dt = last ? Date.now() - last : 1000; last = Date.now();
  const due = Math.max(0, Math.min(Math.ceil(share * 1.25), Math.round((share * dt) / 1000)));
  const slice = pool.splice(0, due);   // these coins are in flight: out of the pool until their result is known
  if (!slice.length && !due) { await sleep(50); continue; }
  if (!slice.length) { try { await load(false); } catch { phase(`PAY_LANE node=${NN} pool-unread`); } if (!pool.length) { phase(`PAY_STOP node=${NN} reason=pool`); break; } continue; }
  const t0 = Date.now();
  await Promise.all(slice.map(async (coin) => {
    attempts++;
    try {
      // One-in one-out payments of one key have one mass. The draft is built for the first coin and every 64th after, and
      // the largest mass seen is used, so the fee stays mass x 150 without a second build per payment (signing headroom).
      if (!massMax || ++massN % 64 === 0) { const draft = k.createTransaction([bare(coin)], [new k.PaymentOutput(new k.Address(addr), BigInt(coin.amount) - 1_000_000n)], 0n, undefined, 1); massMax = Math.max(massMax, massOf(draft)); }
      const fee = BigInt(massMax) * FEE_RATE;
      if (BigInt(coin.amount) <= fee + PP.MIN_SOMPI) { other++; return; }
      const outAmt = BigInt(coin.amount) - fee;
      const tx = k.createTransaction([bare(coin)], [new k.PaymentOutput(new k.Address(addr), outAmt)], 0n, undefined, 1);
      const signed = k.signTransaction(tx, [pk], true);
      const res = await to(rpc.submitTransaction({ transaction: signed, allowOrphan: false }), 8000, "submit");
      ok++; used.set(op(coin), Date.now());
      const id = String(res?.transactionId || signed.id || "");
      if (chain && /^[0-9a-f]{64}$/.test(id)) pool.push({ address: coin.address, outpoint: { transactionId: id, index: 0 }, amount: outAmt, scriptPublicKey: coin.scriptPublicKey, blockDaaScore: coin.blockDaaScore, isCoinbase: false, t: Date.now() });
    } catch (e) {
      const why = reason(e);
      if (why === "mempool_full") { full++; pool.push(coin); return; }   // not spent: the coin goes back; a full mempool does not stop this sender
      if (why === "rpc") pool.push(coin);                                   // not known to be spent
      else used.set(op(coin), Date.now());
      if (why === "rpc") other++;
      else if ((why === "fee" || why === "mass") && !rateStopped) { rateRej++; rateStopped = true; phase(`PAY_STOP node=${NN} reason=rate`); fs.writeFileSync(myStop(), "rate\n"); }
      else { other++; if (++fails > 200 && chain && ok === 0) { chain = false; phase(`PAY_CHAIN node=${NN} off`); } }
      if (why === "rpc" && !recon) { recon = true; try { rpc = await connect(NODE, 2); } catch { phase(`NODE_DROP node=${NN}`); } finally { recon = false; } }
    }
  }));
  const wait = 1000 - (Date.now() - t0);
  if (wait > 0) await sleep(wait);
}
roll(Date.now() + 60000);
try { PP.writeCoins(handed ? HAND : SNAP, pool, { slot: SLOT, of: OF, node: NN }); } catch {}
if (handed) phase(`PAY_HANDOFF node=${NN} n=${pool.length}`);
else phase(`PAY_EXIT node=${NN}`);
try { await rpc.disconnect(); } catch {}
try { await lrpc.disconnect(); } catch {}
process.exit(0);
