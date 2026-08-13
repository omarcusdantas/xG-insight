import { useOutletContext } from "react-router";

export interface RootContext {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
}

export function useRootContext(): RootContext {
  return useOutletContext<RootContext>();
}
