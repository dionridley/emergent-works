export interface Stat {
  value: string;
  numericValue?: number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
}

export const primaryStats: Stat[] = [
  {
    value: "261",
    numericValue: 261,
    label: "Graduates",
    description:
      "System-impacted individuals have graduated from Emergent Works programs",
  },
  {
    value: "73%",
    numericValue: 73,
    suffix: "%",
    label: "Employed",
    description:
      "Of graduates are employed after completing our programs",
  },
  {
    value: "$2+",
    numericValue: 2,
    prefix: "$",
    suffix: "+",
    label: "Above Minimum Wage",
    description:
      "Above the NYC minimum wage is graduates' minimum hourly rate",
  },
];

export const secondaryStats: Stat[] = [
  {
    value: "98%+",
    numericValue: 98,
    suffix: "%+",
    label: "No Re-Offense",
    description:
      "Of graduates have never re-offended after the program",
  },
  {
    value: "8",
    numericValue: 8,
    label: "Contracted Graduates",
    description:
      "Graduates have been contracted directly with Emergent Works",
  },
];

export const allStats = [...primaryStats, ...secondaryStats];

// National comparison data for "Impact First" design
export const nationalComparisons = [
  {
    metric: "Recidivism Rate",
    ew: "< 2%",
    national: "44%",
    ewValue: 2,
    nationalValue: 44,
    source: "Bureau of Justice Statistics",
    description:
      "National average shows 44% of released prisoners are rearrested within the first year. EW graduates maintain a rate below 2%.",
  },
  {
    metric: "Employment After Release",
    ew: "73%",
    national: "40%",
    ewValue: 73,
    nationalValue: 40,
    source: "Prison Policy Initiative",
    description:
      "While only 40% of formerly incarcerated individuals find employment nationally, 73% of EW graduates are employed.",
  },
  {
    metric: "Starting Wage",
    ew: "$2+ above minimum",
    national: "At or below minimum",
    description:
      "EW graduates start at $2+ above NYC minimum wage, compared to the national trend of formerly incarcerated individuals earning at or below minimum wage.",
  },
] as const;
