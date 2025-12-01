export type FeatureFlags = {
  experiments?: {
    bookRating?: boolean;
  };
};

/**
 * PUBLIC_INTERFACE
 * Returns parsed feature flags based on environment variables.
 */
export function useFeatureFlags(): FeatureFlags {
  /**
   * This composable reads NUXT_PUBLIC_FEATURE_FLAGS (optional) which may contain
   * a JSON string or simple key:value pairs. If unset or invalid, returns defaults.
   */
  const runtime = useRuntimeConfig();
  const raw = (runtime.public?.FEATURE_FLAGS as string | undefined) ?? (process.env.NUXT_PUBLIC_FEATURE_FLAGS as string | undefined);

  const flags: FeatureFlags = {};

  const enableRating = () => {
    flags.experiments = flags.experiments || {};
    flags.experiments.bookRating = true;
  };

  if (!raw) {
    return flags;
  }

  try {
    // Try JSON first
    const parsed = JSON.parse(raw);
    if (parsed?.experiments?.bookRating === true) {
      enableRating();
    }
  } catch {
    // Fallback: parse simple tokens like "experiments:bookRating, other:flag"
    const parts = raw.split(/[,\s]+/).map(p => p.trim()).filter(Boolean);
    if (parts.some(p => p.toLowerCase() === 'experiments:bookrating' || p.toLowerCase() === 'bookrating')) {
      enableRating();
    }
  }

  return flags;
}
