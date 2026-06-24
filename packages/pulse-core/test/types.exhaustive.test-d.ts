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
 * Type-only exhaustiveness test for the `NormalizedEvent` discriminated union
 * (issue #298 — M3 "discriminated union refinement").
 *
 * This file is never executed. It is compiled by `tsconfig.typetest.json`
 * (wired into the package `test` script) so that the TypeScript compiler — not
 * manual inspection — guarantees every event type is handled. Add a new member
 * to the `NormalizedEvent` union without updating the switch below and the build
 * fails.
 *
 * The mechanism is the standard `never` exhaustiveness assignment: in a `switch`
 * over `event.type`, once every case is handled the value narrows to `never` in
 * the `default` branch, so `const _x: never = event` compiles. Leave a case out
 * and `event` is no longer `never`, so the assignment is a compile error.
 */

// Positive case: a fully exhaustive switch must compile.
export function assertExhaustive(event: NormalizedEvent): string {
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
    case "account.created":
    case "account.options_changed":
    case "account.merged":
    case "account.bump_sequence":
    case "trustline.added":
    case "trustline.removed":
    case "trustline.updated":
    case "trustline.authorized":
    case "trustline.deauthorized":
    case "offer.created":
    case "offer.updated":
    case "offer.deleted":
    case "data.set":
    case "data.cleared":
    case "claimable.created":
    case "claimable.claimed":
    case "lp.deposited":
    case "lp.withdrawn":
    case "contract.invoked":
    case "contract.emitted":
      return event.type;
    default: {
      const _exhaustive: never = event;
      return _exhaustive;
    }
  }
}

// Negative case: an intentionally incomplete switch must NOT compile. Only one
// branch is handled, so in `default` the value is not `never` and the assignment
// is an error — which `@ts-expect-error` asserts. If the union ever shrank to a
// single member (making this exhaustive), the directive would become unused and
// the build would fail, proving the guard genuinely detects unhandled variants.
export function assertIncompleteIsRejected(event: NormalizedEvent): string {
  switch (event.type) {
    case "payment.received":
      return event.type;
    default: {
      // @ts-expect-error - remaining NormalizedEvent variants are unhandled here.
      const _exhaustive: never = event;
      return _exhaustive;
    }
  }
}
