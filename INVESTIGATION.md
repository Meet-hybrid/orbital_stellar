# INVESTIGATION: `event.decode_failed` support

## Goal
Emit a watcher notification `event.decode_failed` with `{ contractId, eventId, error }` when Soroban/contract event decoding fails, while still delivering the event with `decodedData = undefined`. Also document it in the watcher events table.

## Findings (repo-wide)
- Searched the workspace for any occurrences of:
  - `decodedData`, `decodeData`
  - `decode_failed`, `decodeFailed`
  - `contractId`, `eventId`
  - `Soroban`, `soroban`, `Invocation`, `XDR`, `xdr`
  - generic `decode` / `decoded`
- Result: **0 matches** for all of the above terms.

## What exists in this repo snapshot
- `packages/pulse-core/src/EventEngine.ts`
  - Normalizes and routes Horizon **payments** and **set_options** (`account.options_changed`).
  - There is no Soroban/contract decoding.
- `packages/pulse-webhooks/src/index.ts` and server SSE routes
  - Forward `NormalizedEvent` from `pulse-core` to webhook delivery / clients.

## Conclusion
The decoding layer required to detect decode failures and populate `decodedData` does not exist in the current workspace. Because there is no location where `decodedData` / `{contractId,eventId}` are produced or decode failures are caught, the requested `event.decode_failed` watcher event cannot be implemented here.

## What’s needed to proceed
Provide the missing package/folder (or a different branch/commit) that contains the Soroban/contract decoding logic where `decodedData` is computed and decode failures occur.
