export interface Stat {
  value: string;
  numericValue?: number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
}

export const primaryStats: Stat[] = [
  {
    value: "261",
    numericValue: 261,
    label: "Graduates",
    description:
      "System-impacted individuals have graduated from Emergent Works programs",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="30" height="30" rx="7" stroke="#FFCB70" stroke-width="2"/>
      <path d="M12 26 L12 18 L18 22 L22 14 L28 18" stroke="#FFCB70" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="28" cy="18" r="2.5" fill="#FFF8ED"/>
    </svg>`,
  },
  {
    value: "73%",
    numericValue: 73,
    suffix: "%",
    label: "Employed",
    description:
      "Of graduates are employed after completing our programs",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="13" r="6" fill="#FFCB70"/>
      <circle cx="16" cy="13" r="3.5" fill="#052812"/>
      <circle cx="16" cy="13" r="1.5" fill="#FFCB70"/>
      <path d="M6 32 C6 24 26 24 26 32" stroke="#FFCB70" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <rect x="27" y="18" width="10" height="13" rx="3" fill="#FFCB70"/>
      <line x1="29.5" y1="22" x2="34.5" y2="22" stroke="#052812" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="29.5" y1="25.5" x2="34.5" y2="25.5" stroke="#052812" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="29.5" y1="29" x2="32.5" y2="29" stroke="#052812" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="31" cy="16" r="2.5" fill="#FFF8ED"/>
      <line x1="30.2" y1="15.2" x2="31.8" y2="16.8" stroke="#052812" stroke-width="1" stroke-linecap="round"/>
      <line x1="31.8" y1="15.2" x2="30.2" y2="16.8" stroke="#052812" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
  },
  {
    value: "$2+",
    numericValue: 2,
    prefix: "$",
    suffix: "+",
    label: "Above Minimum Wage",
    description:
      "Above the NYC minimum wage is graduates' minimum hourly rate",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="15" r="8" fill="#FFCB70"/>
      <text x="20" y="19.5" text-anchor="middle" font-size="10" font-weight="900" fill="#052812">$</text>
      <path d="M10 30 C10 24 30 24 30 30" stroke="#FFCB70" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <line x1="12" y1="34" x2="28" y2="34" stroke="#FFCB70" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
      <path d="M24 26 L28 22 L32 26" stroke="#FFF8ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <line x1="28" y1="22" x2="28" y2="31" stroke="#FFF8ED" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
];

