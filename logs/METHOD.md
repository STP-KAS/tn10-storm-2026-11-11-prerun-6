# Method, pre-run 6

> Counts only. Desk side. Mini's files are the chain count.

Accepted hops per cohort, as the desk's coordinator read them: floor (families 1–13) 2,470, double (families 14–16) 713.

Payment submit-OK per target (desk sender log; Mini's files carry what the chain accepted):

- HOLD-1: MET, 60,855 / 60,870 / 60,878 submit-OK per minute read.
- HOLD-2: MET, 120,337 / 120,999 / 122,285 submit-OK per minute read.
- HOLD-3: NOT MET, 144,595 / 139,205 / 140,783 / 133,838 / 137,385 / 132,439 / 132,480 / 135,611 / 137,564 / 136,644 / 136,093 / 132,599 submit-OK per minute read.
- HOLD-4: OBSERVATION, 121,606 submit-OK per minute read.
- RETURN: NOT MET, 60,426 / 60,937 / 60,847 / 60,868 / 60,855 / 60,246 / 60,900 / 60,821 / 60,850 / 60,850 / 60,895 / 60,879 submit-OK per minute read.

Decent on the desk side: HOLD-1 met. The HOLD-4 bot file and Mini's matching mark decide the rest of decent.

Hop rates were 100 sompi/gram for families 1–13 and 200 for families 14–16, per hop, in one builder. The funding coins were not one size, so the fee is not called the whole cause. Both cohorts shared one node set (family node 1).

## Misses

- HOLD-3 NOT MET.
- RETURN NOT MET.


## Fixes

- 2026-11-11T20:33:12Z HOLD-3: restarted the payment senders with their pools handed off and dealt again (one try for this reason; 2 of 2 running again after the restart, pools 3002 / 2998 coins, fair).
- 2026-11-11T20:53:12Z RETURN: restarted the payment senders with their pools handed off and dealt again (one try for this reason; 2 of 2 running again after the restart, pools 3000 / 3000 coins, fair).

## On origin

- counts/desk/HOLD-1.md: 2026-11-11T20:22:13Z
- counts/desk/HOLD-2.md: 2026-11-11T20:26:13Z
- counts/desk/HOLD-3.md: 2026-11-11T20:41:12Z
- counts/desk/HOLD-4.md: 2026-11-11T20:46:13Z
- counts/desk/RETURN.md: 2026-11-11T21:00:13Z
