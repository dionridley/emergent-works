import { useState } from "react";

const frequencies = [
  { id: "one-time", label: "One time" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
] as const;

const amounts = [50, 100, 200, 1000] as const;

const impactStatements: Record<number, string> = {
  50: "$50 provides one mentoring session for a system-impacted individual.",
  100: "$100 covers materials and tools for a full digital literacy workshop.",
  200: "$200 funds a week of creative workforce programming for one participant.",
  1000: "$1,000 sponsors a student through an entire program cohort.",
};

function formatCurrency(amount: number): string {
  return amount >= 1000
    ? `$${(amount / 1000).toFixed(0)},${String(amount % 1000).padStart(3, "0")}`
    : `$${amount}`;
}

export default function DonationForm() {
  const [frequency, setFrequency] = useState<string>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);

  const displayAmount = isCustom && customAmount
    ? parseInt(customAmount, 10) || 0
    : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    setIsCustom(true);
  };

  return (
    <div className="space-y-6">
      {/* Frequency Selector */}
      <fieldset>
        <legend className="text-sm font-semibold text-text mb-3">
          Frequency
        </legend>
        <div className="flex flex-wrap gap-3">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              type="button"
              onClick={() => setFrequency(freq.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                frequency === freq.id
                  ? "bg-primary text-white"
                  : "bg-white text-text border border-gray-200 hover:border-primary/30"
              }`}
              aria-pressed={frequency === freq.id}
            >
              {freq.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Amount Selector */}
      <fieldset>
        <legend className="text-sm font-semibold text-text mb-3">
          Amount
        </legend>
        <div className="flex flex-wrap gap-3">
          {amounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`px-5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                !isCustom && selectedAmount === amount
                  ? "bg-primary text-white"
                  : "bg-white text-text border border-gray-200 hover:border-primary/30"
              }`}
              aria-pressed={!isCustom && selectedAmount === amount}
            >
              {formatCurrency(amount)}
            </button>
          ))}
          <div
            className={`flex items-center rounded-lg overflow-hidden transition-colors ${
              isCustom
                ? "ring-2 ring-primary"
                : "border border-gray-200"
            }`}
          >
            <span className="pl-3 text-text/60 text-base">$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Other"
              value={customAmount}
              onFocus={handleCustomFocus}
              onChange={handleCustomChange}
              className="w-20 py-2.5 pr-3 pl-1 text-base bg-transparent outline-none text-text placeholder:text-text/40"
              aria-label="Custom donation amount"
            />
          </div>
        </div>
      </fieldset>

      {/* Impact Statement */}
      {!isCustom && impactStatements[selectedAmount] && (
        <p className="text-sm text-text/60 leading-relaxed">
          {impactStatements[selectedAmount]}
        </p>
      )}

      {/* Donate Button */}
      <button
        type="button"
        className="w-full py-4 rounded-lg bg-primary text-white text-lg font-bold hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`Donate ${formatCurrency(displayAmount)}`}
      >
        Donate {displayAmount > 0 ? formatCurrency(displayAmount) : ""}
      </button>

      {/* Trust Signal */}
      <p className="text-xs text-text/45 leading-relaxed text-center">
        Emergent Works is a 501(c)(3) nonprofit organization.
        EIN: 85-1197743. All donations are tax-deductible to the extent allowed by law.
      </p>
    </div>
  );
}
