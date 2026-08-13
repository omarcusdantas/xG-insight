import { useContext } from "react";
import { MatchContext } from "../context/matchContextInstance";
import type { MatchContextValue } from "../context/matchContextInstance";

export function useMatchContext(): MatchContextValue {
  const ctx = useContext(MatchContext);
  if (!ctx) {
    throw new Error("useMatchContext must be used within a MatchProvider");
  }
  return ctx;
}
