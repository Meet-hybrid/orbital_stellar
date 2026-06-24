import type { NormalizedEvent } from "../src/index.js";

/**
 * Helper that accepts `never`. Used in the `default` branch of an exhaustive
 * switch over `NormalizedEvent.type`. If every discriminant is handled the
 * residual type in `default` is `never` and this compiles. If a case is
 * missing the residual type is the omitted branch and TypeScript raises a
 * compile error.
 */
function assertExhaustive(_x: never): void {}

// ---------------------------------------------------------------------------
// Happy path: every NormalizedEvent discriminant is handled.
// ---------------------------------------------------------------------------

/**
 * Complete exhaustive switch over all 15 NormalizedEvent type discriminants.
 * Because every discriminant is covered, `event` in the `default` branch is
 * `never` and `assertExhaustive` compiles without error.
 *
 * Adding a new event type to the NormalizedEvent union **without** adding its
 * case here produces a compile error at the `assertExhaustive` call below.
 */
function handleAll(event: NormalizedEvent): void {
  switch (event.type) {
    case "payment.received":
    case "payment.sent":
    case "payment.self":
      break;
    case "account.options_changed":
      break;
    case "account.created":
      break;
    case "trustline.added":
    case "trustline.removed":
    case "trustline.updated":
      break;
    case "account.merged":
      break;
    case "offer.created":
    case "offer.updated":
    case "offer.deleted":
      break;
    case "account.bump_sequence":
      break;
    case "data.set":
    case "data.cleared":
      break;
    case "claimable.created":
      break;
    case "claimable.claimed":
      break;
    case "lp.deposited":
      break;
    case "lp.withdrawn":
      break;
    case "trustline.authorized":
    case "trustline.deauthorized":
      break;
    case "contract.invoked":
      break;
    case "contract.emitted":
      break;
    default:
      assertExhaustive(event);
  }
}

// ---------------------------------------------------------------------------
// Sad path: @ts-expect-error proves omission is caught at compile time.
// ---------------------------------------------------------------------------

/**
 * Incomplete switch — intentionally omits the `"account.merged"` case.
 * Because the union is not fully covered, `event` in the `default` branch is
 * `AccountMergeEvent & { readonly timestampDate: Date }` — not `never` — so
 * `assertExhaustive(event)` produces a type error.
 *
 * The `@ts-expect-error` directive verifies that TypeScript indeed catches
 * the missing case. If a new event type were added to NormalizedEvent without
 * updating this switch, the directive would become unused and `tsc` would
 * error with "Unused '@ts-expect-error' directive."
 */
function incomplete(event: NormalizedEvent): void {
  switch (event.type) {
    case "payment.received":
    case "payment.sent":
    case "payment.self":
      break;
    case "account.options_changed":
      break;
    case "account.created":
      break;
    case "trustline.added":
    case "trustline.removed":
    case "trustline.updated":
      break;
    // account.merged intentionally omitted
    case "offer.created":
    case "offer.updated":
    case "offer.deleted":
      break;
    case "account.bump_sequence":
      break;
    case "data.set":
    case "data.cleared":
      break;
    case "claimable.created":
      break;
    case "claimable.claimed":
      break;
    case "lp.deposited":
      break;
    case "lp.withdrawn":
      break;
    case "trustline.authorized":
    case "trustline.deauthorized":
      break;
    case "contract.invoked":
      break;
    case "contract.emitted":
      break;
    default:
      // @ts-expect-error — "account.merged" is not handled, so event is not never
      assertExhaustive(event);
  }
}
