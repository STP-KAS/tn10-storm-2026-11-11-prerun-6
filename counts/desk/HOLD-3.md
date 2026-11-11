NOT MET

# HOLD-3, desk sender log, pre-run 6

> Counts only. The desk's sender log. It is not a chain count. Mini counts the chain.

Payment offer 3,040 tx/s at 150 sompi/gram, from 2 payment senders, one per kept public node. Families offer 1.2 hop/s, 16 families live, one family-sender process and one builder.

Payment pile: 6,000 coins on the payment key at the preflight, dealt evenly over the 2 senders before the first payment (last deal, repair: 3,509 / 3,509 coins, even). A coin is re-used about once a second, so one sender's ceiling is about its pool per second.

## Hop rate per cohort, as built

Floor (families 1–13): 100 sompi/gram per hop. Double (families 14–16): 200 sompi/gram per hop. The rate rides on each hop line to the one builder.

## Funding coins, as read from the desk node

The funding coins were not one size. Sizes seen, whole tKAS (coins): 30 (1,522), 29 (1,287), 31 (1,252), 32 (981), 33 (755), 34 (523), 28 (393), 35 (369), 36 (238), 37 (99), 27 (84), 38 (80), and 61 more sizes. The fee is not called the whole cause.

## Minutes

| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other | Floor OK / att / rate rej / full rej / waiting | Double OK / att / rate rej / full rej / waiting | Family stalls logged | Clean |
|---|---:|---:|---:|---:|---:|---|---|---:|---|
| 2026-11-11T20:27 | 144,595 | 144,595 | 0 | 0 | 0 | 1 / 919 / 0 / 0 / 14 | 4 / 212 / 0 / 0 / 3 | 5 | no: ok-off |
| 2026-11-11T20:28 | 139,205 | 139,205 | 0 | 0 | 0 | 4 / 922 / 0 / 0 / 14 | 5 / 214 / 0 / 0 / 3 | 2 | no: ok-off |
| 2026-11-11T20:29 | 140,783 | 140,783 | 0 | 0 | 0 | 0 / 915 / 0 / 0 / 14 | 5 / 212 / 0 / 0 / 3 | 5 | no: ok-off |
| 2026-11-11T20:30 | 133,838 | 133,838 | 0 | 0 | 0 | 3 / 914 / 0 / 0 / 14 | 3 / 213 / 0 / 0 / 3 | 1 | no: ok-off |
| 2026-11-11T20:31 | 137,385 | 139,285 | 0 | 0 | 1900 | 1 / 281 / 0 / 0 / 11 | 0 / 63 / 0 / 0 / 1 | 3 | no: ok-off;node-1-unread |
| 2026-11-11T20:32 | 132,439 | 132,439 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 10 | 0 / 0 / 0 / 0 / 0 | 6 | no: ok-off;families-not-attempting=16 |
| 2026-11-11T20:35 | 132,480 | 132,480 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 7 | 0 / 0 / 0 / 0 / 0 | 2 | no: ok-off;families-not-attempting=16 |
| 2026-11-11T20:36 | 135,611 | 135,611 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 4 | 0 / 0 / 0 / 0 / 0 | 0 | no: ok-off;families-not-attempting=16 |
| 2026-11-11T20:37 | 137,564 | 137,564 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 3 | 0 / 0 / 0 / 0 / 0 | 3 | no: ok-off;families-not-attempting=16 |
| 2026-11-11T20:38 | 136,644 | 136,644 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 2 | 0 / 0 / 0 / 0 / 0 | 1 | no: ok-off;families-not-attempting=16 |
| 2026-11-11T20:39 | 136,093 | 136,093 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 1 | no: ok-off;families-not-attempting=16 |
| 2026-11-11T20:40 | 132,599 | 132,599 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 1 | no: ok-off;families-not-attempting=16 |

A family stall is a coordinator mark: no hop of that family landed for a while. The family was still attempting. It is logged, and it does not make the minute dirty.

Within 10 percent means 164,160 to 200,640 submit-OK in the minute.

## Public nodes (local numbers)

Kept: 1, 5. The family sender is on node 1. Both cohorts share that node.

Kept nodes are unique kaspads: each answered with its own node id at the preflight. 3 candidate endpoints passed the check and were 2 kaspads (node 4 is node 1; the second hostname was not used). One payment sender per kaspad.

| Node | Synced every sample | Last DAA | Pay submit-OK | Pay rejects | Dropped sockets | Answer ms, median |
|---:|---|---:|---:|---:|---:|---:|
| 1 | no | 620933164 | 684,000 | 0 | 0 | 45 |
| 5 | yes | 620933164 | 955,236 | 1900 | 0 | 44 |

## Hop submit to landing, per cohort

| Cohort | Landed of OK | Median ms | Slow tail (p95) ms |
|---|---:|---:|---:|
| floor | 9 of 9 | 159362 | 535237 |
| double | 17 of 17 | 30500 | 132477 |

Landing is the accepting block header time the desk's coordinator read. Waiting is submitted-OK not yet landed at the minute's end.
