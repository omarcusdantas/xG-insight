import type { LoaderFunctionArgs } from "react-router";
import { fetchShotmap } from "./fetchShotmap";
import { fetchEvent } from "./fetchEvent";
import type { Shot } from "../types/shotmap";
import type { EventInfo } from "../types/event";

export interface MatchData {
  shots: Shot[];
  eventInfo: EventInfo;
}

export async function matchLoader({ params }: LoaderFunctionArgs): Promise<MatchData> {
  const id = params.id ?? "";
  const [shots, eventInfo] = await Promise.all([fetchShotmap(id), fetchEvent(id)]);
  return { shots, eventInfo };
}
