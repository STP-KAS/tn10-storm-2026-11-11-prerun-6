NOT MET

# RETURN, desk sender log, pre-run 6

> Counts only. The desk's sender log. It is not a chain count. Mini counts the chain.

Payment offer 1,013 tx/s at 150 sompi/gram, from 2 payment senders, one per kept public node. Families offer 1.2 hop/s, 16 families live, one family-sender process and one builder.

Payment pile: 6,000 coins on the payment key at the preflight, dealt evenly over the 2 senders before the first payment (last deal, repair: 3,000 / 3,000 coins, even). A coin is re-used about once a second, so one sender's ceiling is about its pool per second.

## Hop rate per cohort, as built

Floor (families 1–13): no rows sompi/gram per hop. Double (families 14–16): no rows sompi/gram per hop. The rate rides on each hop line to the one builder.

## Funding coins, as read from the desk node

The funding coins were not one size. Sizes seen, whole tKAS (coins): 30 (1,522), 29 (1,287), 31 (1,252), 32 (981), 33 (755), 34 (523), 28 (393), 35 (369), 36 (238), 37 (99), 27 (84), 38 (80), and 61 more sizes. The fee is not called the whole cause.

## Minutes

| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other | Floor OK / att / rate rej / full rej / waiting | Double OK / att / rate rej / full rej / waiting | Family stalls logged | Clean |
|---|---:|---:|---:|---:|---:|---|---|---:|---|
| 2026-11-11T20:47 | 60,426 | 60,426 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:48 | 60,937 | 60,937 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:49 | 60,847 | 60,847 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:50 | 60,868 | 60,868 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:51 | 60,855 | 60,855 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:52 | 60,246 | 60,246 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:54 | 60,900 | 60,900 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:55 | 60,821 | 60,821 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:56 | 60,850 | 60,850 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:57 | 60,850 | 60,850 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:58 | 60,895 | 60,895 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |
| 2026-11-11T20:59 | 60,879 | 60,879 | 0 | 0 | 0 | 0 / 0 / 0 / 0 / 1 | 0 / 0 / 0 / 0 / 0 | 0 | no: families-not-attempting=16 |

A family stall is a coordinator mark: no hop of that family landed for a while. The family was still attempting. It is logged, and it does not make the minute dirty.

Within 10 percent means 54,702 to 66,858 submit-OK in the minute.

## Public nodes (local numbers)

Kept: 1, 5. The family sender is on node 1. Both cohorts share that node.

Kept nodes are unique kaspads: each answered with its own node id at the preflight. 3 candidate endpoints passed the check and were 2 kaspads (node 4 is node 1; the second hostname was not used). One payment sender per kaspad.

| Node | Synced every sample | Last DAA | Pay submit-OK | Pay rejects | Dropped sockets | Answer ms, median |
|---:|---|---:|---:|---:|---:|---:|
| 1 | yes | 620944434 | 365,112 | 0 | 0 | 43 |
| 5 | yes | 620944434 | 364,262 | 0 | 0 | 39 |

## Hop submit to landing, per cohort

| Cohort | Landed of OK | Median ms | Slow tail (p95) ms |
|---|---:|---:|---:|
| floor | 0 of 0 | - | - |
| double | 0 of 0 | - | - |

Landing is the accepting block header time the desk's coordinator read. Waiting is submitted-OK not yet landed at the minute's end.
