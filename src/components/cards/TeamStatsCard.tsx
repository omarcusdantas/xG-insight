import { type TeamSummary, atLeast } from '../../lib/xg';
import { Card } from './Card';
import { pct } from '../../lib/format';
import { useTranslation } from 'react-i18next';

type TeamStatsCardProps = {
  summary: TeamSummary;
  titleAccent: 'home' | 'away';
};

export function TeamStatsCard({ summary, titleAccent }: TeamStatsCardProps) {
  const { t } = useTranslation();
  const rows = [1, 2, 3, 4].map((n) => ({
    n,
    xg: pct(atLeast(summary.goalDist, n)),
    xgot: pct(atLeast(summary.goalDistXgot, n)),
    xgPx: Math.max(2, Math.round(atLeast(summary.goalDist, n) * 150)),
    xgotPx: Math.max(2, Math.round(atLeast(summary.goalDistXgot, n) * 150)),
  }));

  return (
    <Card title={t('cards.expectedGoals')} titleAccent={titleAccent}>
      <div className="flex items-center justify-between border-b border-border/50 pb-2">
        <span className="text-sm text-text-dim">
          {t('stats.expectedGoals')}{' '}
          <span className="text-xs text-text-dim/70">
            ({summary.shotCount} {t('cards.shots').toLowerCase()})
          </span>
        </span>
        <span className="text-xl font-bold tabular-nums text-cyan">
          {summary.totalXg.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between border-b border-border/50 py-2">
        <span className="text-sm text-text-dim">
          {t('stats.xGOnTarget')}{' '}
          <span className="text-xs text-text-dim/70">
            ({summary.onTargetCount} {t('cards.shots').toLowerCase()})
          </span>
        </span>
        <span className="text-xl font-bold tabular-nums text-green">
          {summary.totalXgot.toFixed(2)}
        </span>
      </div>

      <table className="mt-2 w-full border-collapse text-sm tabular-nums">
        <thead>
          <tr>
            <th className="border-b border-border py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              {t('goalsTable.title')}
            </th>
            <th className="border-b border-border py-2 text-right text-[10px] font-semibold uppercase tracking-wide text-cyan">
              {t('goalsTable.thXg')}
            </th>
            <th className="border-b border-border py-2 text-right text-[10px] font-semibold uppercase tracking-wide text-green">
              {t('goalsTable.thXgot')}
            </th>
            <th className="border-b border-border py-2 text-right text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              {t('goalsTable.thProbability')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.n}>
              <td className="border-b border-border/30 py-2">{row.n}+</td>
              <td className="border-b border-border/30 py-2 text-right text-cyan">
                {row.xg}
              </td>
              <td className="border-b border-border/30 py-2 text-right text-green">
                {row.xgot}
              </td>
              <td className="border-b border-border/30 py-2">
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="block h-1.5 rounded-full bg-cyan/80"
                    style={{ width: `${row.xgPx}px`, maxWidth: '100%' }}
                  />
                  <span
                    className="block h-1.5 rounded-full bg-green/60"
                    style={{ width: `${row.xgotPx}px`, maxWidth: '100%' }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}