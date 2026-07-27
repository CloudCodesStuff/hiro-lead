import type { RoutineItem } from "@/types";

interface RoutineCardProps {
  routine: RoutineItem;
}

export function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <h4 className="text-[11px] font-semibold text-[#4a9c5c] tracking-[0.12em] mb-4">
        {routine.time}
      </h4>
      <ul className="space-y-3">
        {routine.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[14px] text-[#8a8f98] leading-relaxed"
          >
            <span className="text-[#4a9c5c] mt-0.5 flex-shrink-0 font-mono text-[11px] tabular-nums opacity-70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
