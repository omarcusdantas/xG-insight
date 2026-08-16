import { Card } from "./Card";
import { ShotDetail } from "../shots/ShotDetail";
import { ShotNavigator } from "../shots/ShotNavigator";
import { useMatchContext } from "../../hooks/useMatchContext";
import { useTranslation } from "react-i18next";

export function ShotsCard() {
  const { t } = useTranslation();
  const { team } = useMatchContext();
  const accent = team === "home" ? "home" : "away";

  return (
    <Card title={t("cards.shots")} titleAccent={accent}>
      <ShotNavigator />
      <ShotDetail />
    </Card>
  );
}
