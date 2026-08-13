import type { LoaderFunctionArgs } from "react-router";
import { fetchShotmap } from "./fetchShotmap";
import type { Shot } from "../types/shotmap";

export async function matchLoader({ params }: LoaderFunctionArgs): Promise<Shot[]> {
  const id = params.id ?? "";
  return fetchShotmap(id);
}
