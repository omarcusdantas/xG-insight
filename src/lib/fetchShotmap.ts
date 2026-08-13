import type { Shot, ShotmapResponse } from "../types/shotmap";

export async function fetchShotmap(id: string): Promise<Shot[]> {
  const url = `https://www.sofascore.com/api/v1/event/${encodeURIComponent(id)}/shotmap`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to load shotmap", { status: res.status });
  }
  const data = (await res.json()) as ShotmapResponse;
  return data.shotmap;
}
