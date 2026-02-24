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
      "$100 covers materials and tools for a full digital literacy workshop.",
  },
  {
    amount: 200,
    label: "$200",
    impact:
      "$200 funds a week of creative workforce programming for one participant.",
  },
  {
    amount: 1000,
    label: "$1,000",
    impact:
      "$1,000 sponsors a student through an entire program cohort.",
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
