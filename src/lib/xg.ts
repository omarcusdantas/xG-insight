function dist(probs: number[]): number[] {
  let dp = [1];
  for (const p of probs) {
    const nd = Array(dp.length + 1).fill(0);
    for (let i = 0; i < dp.length; i++) {
      nd[i] += dp[i] * (1 - p);
      nd[i + 1] += dp[i] * p;
    }
    dp = nd;
  }
  return dp;
}

export function atLeast(d: number[], n: number): number {
  let s = 0;
  for (let i = n; i < d.length; i++) s += d[i];
  return s;
}

export interface MatchOutcome {
  homeWin: number;
  draw: number;
  awayWin: number;
}

export function matchOutcome(homeDist: number[], awayDist: number[]): MatchOutcome {
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  for (let i = 0; i < homeDist.length; i++) {
    for (let j = 0; j < awayDist.length; j++) {
      const p = homeDist[i] * awayDist[j];
      if (i > j) homeWin += p;
      else if (i < j) awayWin += p;
      else draw += p;
    }
  }
  return { homeWin, draw, awayWin };
}

export interface TeamSummary {
  totalXg: number;
  totalXgot: number;
  shotCount: number;
  onTargetCount: number;
  goalDist: number[];
  goalDistXgot: number[];
}

export function summarizeTeam(shots: { xg: number; xgot: number }[]): TeamSummary {
  const probs = shots.map((s) => s.xg);
  const probsXgot = shots.map((s) => s.xgot || 0);
  return {
    totalXg: probs.reduce((a, b) => a + b, 0),
    totalXgot: probsXgot.reduce((a, b) => a + b, 0),
    shotCount: shots.length,
    onTargetCount: shots.filter((s) => s.xgot > 0).length,
    goalDist: dist(probs),
    goalDistXgot: dist(probsXgot),
  };
}
