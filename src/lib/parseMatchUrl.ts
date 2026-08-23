const MATCH_URL_REGEX = /\/match\/[^/]+\/([A-Za-z0-9]+)(?:[#?][^\s]*)?$/;

export function extractMatchId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^\d+$/.test(trimmed)) return trimmed;

  if (/^https?:\/\//i.test(trimmed) || trimmed.includes("sofascore.com")) {
    const match = trimmed.match(MATCH_URL_REGEX);
    return match ? match[1] : null;
  }

  return null;
}
