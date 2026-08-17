import { Select } from "../ui/Select";
import { useMatchContext } from "../../hooks/useMatchContext";

import type { Team } from "../../types/shotmap";

export function TeamSelector() {
  const { team, setTeam, homeTeamName, awayTeamName } = useMatchContext();

  return (
    <div className="sticky top-14 z-30 -mx-4 border-t border-border bg-bg/85 px-4 py-3 pb-0 backdrop-blur-md sm:mx-0 sm:px-0">
      <Select
        ariaLabel={homeTeamName}
        value={team}
        onChange={(e) => setTeam(e.target.value as Team)}
        options={[
          { value: "home", label: homeTeamName },
          { value: "away", label: awayTeamName },
        ]}
      />
    </div>
  );
}
