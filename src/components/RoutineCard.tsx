import type { RoutineItem } from "@/types";

interface RoutineCardProps {
  routine: RoutineItem;
}

export function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 border border-[#e5e7eb] dark:border-[#1f1f1f] bg-white dark:bg-[#111]">
      <h4 className="text-xs font-semibold text-[#10b981] mb-4">
        {routine.time}
      </h4>
      <ul className="space-y-3">
        {routine.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed"
          >
            <span className="text-[#10b981] mt-0.5 flex-shrink-0 font-mono text-xs">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
