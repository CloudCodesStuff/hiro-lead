"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / Math.max(total, 1)) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-10">
      {/* Track */}
      <div className="h-[2px] w-full bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4a9c5c] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[12px] text-[#62666d]">
          {current} of {total}
        </span>
        <span className="text-[12px] text-[#4a9c5c] font-medium">{pct}%</span>
      </div>
    </div>
  );
}
