/**
 * Deep-partial patch type for dictionaries.
 *
 * A language pack may translate any subset of keys: objects merge
 * recursively, arrays are replaced wholesale when provided, and anything
 * missing falls back to the next dictionary in the locale's chain
 * (ultimately English). This keeps new languages shippable incrementally
 * without breaking the full `Dictionary` contract.
 */
export type Patch<T> = T extends readonly unknown[]
  ? T | undefined
  : T extends object
    ? { [K in keyof T]?: Patch<T[K]> }
    : T | undefined;

/** Recursively merge a patch over a base dictionary. Never mutates inputs. */
export function mergePatch<T>(base: T, patch: Patch<T> | undefined): T {
  if (patch === undefined) return base;
  if (Array.isArray(patch)) return patch as T;
  if (
    typeof patch === "object" &&
    patch !== null &&
    typeof base === "object" &&
    base !== null &&
    !Array.isArray(base)
  ) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
      if (value !== undefined) {
        out[key] = mergePatch(out[key], value);
      }
    }
    return out as T;
  }
  return patch as T;
}
