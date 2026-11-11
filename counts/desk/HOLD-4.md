OBSERVATION

# HOLD-4, desk sender log, pre-run 6

> Counts only. The desk's sender log. It is not a chain count. Mini counts the chain.

The pinned minute is the first whole UTC minute whose start is at least 3 minutes after HOLD-3's On origin time. The rate in that minute is the reading.

Payment offer 4,053 tx/s at 150 sompi/gram, from 2 payment senders, one per kept public node. Families offer 1.2 hop/s, 16 families live, one family-sender process and one builder.

Payment pile: 6,000 coins on the payment key at the preflight, dealt evenly over the 2 senders before the first payment (last deal, repair: 3,509 / 3,509 coins, even). A coin is re-used about once a second, so one sender's ceiling is about its pool per second.

## Hop rate per cohort, as built

Floor (families 1–13): no rows sompi/gram per hop. Double (families 14–16): no rows sompi/gram per hop. The rate rides on each hop line to the one builder.

## Funding coins, as read from the desk node

The funding coins were not one size. Sizes seen, whole tKAS (coins): 30 (1,522), 29 (1,287), 31 (1,252), 32 (981), 33 (755), 34 (523), 28 (393), 35 (369), 36 (238), 37 (99), 27 (84), 38 (80), and 61 more sizes. The fee is not called the whole cause.

## Minutes

| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other | Floor OK / att / rate rej / full rej / waiting | Double OK / att / rate rej / full rej / waiting | Family stalls logged | Clean |
|---|---:|---:|---:|---:|---:|---|---|---:|---|
| 2026-11-11T20:45 | 121,606 | 121,606 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: ok-off;families-not-attempting=16 |

A family stall is a coordinator mark: no hop of that family landed for a while. The family was still attempting. It is logged, and it does not make the minute dirty.

Within 10 percent means 218,862 to 267,498 submit-OK in the minute.

## Public nodes (local numbers)

Kept: 1, 5. The family sender is on node 1. Both cohorts share that node.

Kept nodes are unique kaspads: each answered with its own node id at the preflight. 3 candidate endpoints passed the check and were 2 kaspads (node 4 is node 1; the second hostname was not used). One payment sender per kaspad.

| Node | Synced every sample | Last DAA | Pay submit-OK | Pay rejects | Dropped sockets | Answer ms, median |
|---:|---|---:|---:|---:|---:|---:|
| 1 | yes | 620935905 | 55,748 | 0 | 0 | 48 |
| 5 | yes | 620935905 | 65,858 | 0 | 0 | 39 |

## Hop submit to landing, per cohort

| Cohort | Landed of OK | Median ms | Slow tail (p95) ms |
|---|---:|---:|---:|
| floor | 0 of 0 | - | - |
| double | 0 of 0 | - | - |

Landing is the accepting block header time the desk's coordinator read. Waiting is submitted-OK not yet landed at the minute's end.
