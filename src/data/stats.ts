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

