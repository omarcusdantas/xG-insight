import { Select } from "../ui/Select";
import { useMatchContext } from "../../hooks/useMatchContext";
import { useTranslation } from "react-i18next";

import type { Team } from "../../types/shotmap";

export function TeamSelector() {
  const { t } = useTranslation();
  const { team, setTeam } = useMatchContext();

  return (
    <div className="sticky top-14 z-30 -mx-4 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md sm:mx-0 sm:px-0">
      <Select
        ariaLabel={t("filters")}
        value={team}
        onChange={(e) => setTeam(e.target.value as Team)}
        options={[
          { value: "home", label: t("teams.home") },
          { value: "away", label: t("teams.away") },
        ]}
      />
    </div>
  );
}
