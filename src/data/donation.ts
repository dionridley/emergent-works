export interface DonationTier {
  amount: number;
  label: string;
  impact: string;
}

export const donationTiers: DonationTier[] = [
  {
    amount: 50,
    label: "$50",
    impact:
      "$50 provides one mentoring session for a system-impacted individual.",
  },
  {
    amount: 100,
    label: "$100",
    impact:
      "$100 covers weekly stipend for one T.RAP student to learn digital literacy, SEL, music production and partake in certificate trainings.",
  },
  {
    amount: 250,
    label: "$250",
    impact:
      "$250 covers one week of paid hours for an alumni instructor to gain more work experience.",
  },
  {
    amount: 1000,
    label: "$1,000",
    impact:
      "$1000 covers graduation stipends for 10 T.RAP graduates obtaining essential digital, music production and workforce readiness skills and completing milestone projects.",
  },
];

export type DonationFrequency = "one-time" | "monthly" | "yearly";

export const donationFrequencies: { value: DonationFrequency; label: string }[] = [
  { value: "one-time", label: "One time" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const donationTrust =
  "Emergent Works is a 501(c)(3) nonprofit organization. EIN: 85-1197743. All donations are tax-deductible to the extent allowed by law.";
