MET

# HOLD-2, desk sender log, pre-run 6

> Counts only. The desk's sender log. It is not a chain count. Mini counts the chain.

Payment offer 2,027 tx/s at 150 sompi/gram, from 2 payment senders, one per kept public node. Families offer 1.2 hop/s, 16 families live, one family-sender process and one builder.

Payment pile: 6,000 coins on the payment key at the preflight, dealt evenly over the 2 senders before the first payment (last deal, start: 3,000 / 3,000 coins, even). A coin is re-used about once a second, so one sender's ceiling is about its pool per second.

## Hop rate per cohort, as built

Floor (families 1–13): 100 sompi/gram per hop. Double (families 14–16): 200 sompi/gram per hop. The rate rides on each hop line to the one builder.

## Funding coins, as read from the desk node

The funding coins were not one size. Sizes seen, whole tKAS (coins): 30 (1,520), 29 (1,285), 31 (1,257), 32 (983), 33 (755), 34 (523), 28 (388), 35 (371), 36 (238), 37 (99), 27 (83), 38 (80), and 61 more sizes. The fee is not called the whole cause.

## Minutes

| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other | Floor OK / att / rate rej / full rej / waiting | Double OK / att / rate rej / full rej / waiting | Family stalls logged | Clean |
|---|---:|---:|---:|---:|---:|---|---|---:|---|
| 2026-11-11T20:23 | 120,337 | 120,337 | 0 | 0 | 0 | 15 / 924 / 0 / 0 / 14 | 7 / 214 / 0 / 0 / 3 | 11 | yes |
| 2026-11-11T20:24 | 120,999 | 120,999 | 0 | 0 | 0 | 4 / 922 / 0 / 0 / 14 | 8 / 215 / 0 / 0 / 3 | 6 | yes |
| 2026-11-11T20:25 | 122,285 | 122,285 | 0 | 0 | 0 | 22 / 926 / 0 / 0 / 14 | 16 / 219 / 0 / 0 / 3 | 2 | yes |

A family stall is a coordinator mark: no hop of that family landed for a while. The family was still attempting. It is logged, and it does not make the minute dirty.

Within 10 percent means 109,458 to 133,782 submit-OK in the minute.

## Public nodes (local numbers)

Kept: 1, 5. The family sender is on node 1. Both cohorts share that node.

Kept nodes are unique kaspads: each answered with its own node id at the preflight. 3 candidate endpoints passed the check and were 2 kaspads (node 4 is node 1; the second hostname was not used). One payment sender per kaspad.

| Node | Synced every sample | Last DAA | Pay submit-OK | Pay rejects | Dropped sockets | Answer ms, median |
|---:|---|---:|---:|---:|---:|---:|
| 1 | yes | 620925601 | 181,041 | 0 | 0 | 37 |
| 5 | yes | 620925601 | 182,580 | 0 | 0 | 47 |

## Hop submit to landing, per cohort

| Cohort | Landed of OK | Median ms | Slow tail (p95) ms |
|---|---:|---:|---:|
| floor | 33 of 41 | 17836 | 101238 |
| double | 30 of 31 | 10475 | 53332 |

Landing is the accepting block header time the desk's coordinator read. Waiting is submitted-OK not yet landed at the minute's end.
