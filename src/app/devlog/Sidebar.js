"use client";
import Link from "next/link";

export default function Sidebar({ activeWeek }) {
  // The latest week you have actually finished writing
  const latestPublishedWeek = 9; 

  const weeks = [
    { num: 1, text: "text-red-500", dot: "bg-green-700" },
    { num: 2, text: "text-orange-500", dot: "bg-orange-700" },
    { num: 3, text: "text-amber-500", dot: "bg-amber-700" },
    { num: 4, text: "text-yellow-500", dot: "bg-pink-700" },
    { num: 5, text: "text-green-500", dot: "bg-indigo-700" },
    { num: 6, text: "text-emerald-500", dot: "bg-teal-700" },
    { num: 7, text: "text-teal-500", dot: "bg-rose-700" },
    { num: 8, text: "text-pink-500", dot: "bg-red-700" },
    { num: 9, text: "text-rose-500", dot: "bg-brown-700" },
    { num: 10, text: "text-indigo-500", dot: "white-700" },
    { num: 11, text: "text-blue-500", dot: "bg-blue-700" },
    // Steel Gray (Slate) and a Custom Gold Hex
    { num: 12, text: "text-[#D4AF37]", dot: "bg-[#D4AF37]", isGold: true }, 
  ];

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-32 p-6 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Log Index</h4>
        <div className="flex flex-col gap-4">
          
          {weeks.map((week) => {
            const isActive = week.num === activeWeek;
            const isDisabled = week.num > latestPublishedWeek;

            // If it's disabled, we use a span (no link), otherwise a Link
            const Content = (
              <>
                {isActive ? (
                  <span className={`w-2 h-2 rounded-full ${week.dot} shadow-sm`}></span>
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isDisabled ? 'bg-gray-100' : 'bg-gray-200'}`}></span>
                )}
                Week {week.num}
              </>
            );

            if (isDisabled) {
              return (
                <div 
                  key={week.num} 
                  className="text-sm font-semibold text-gray-200 flex items-center gap-3 cursor-not-allowed select-none"
                >
                  {Content}
                </div>
              );
            }

            return (
              <Link 
                key={week.num} 
                href={`/devlog/week-${week.num}`}
                className={`text-sm font-semibold transition-all flex items-center gap-3 ${
                  isActive 
                    ? `${week.text} translate-x-2 font-black` 
                    : "text-gray-400 hover:text-gray-800 hover:translate-x-1"
                }`}
              >
                {Content}
              </Link>
            );
          })}

        </div>
      </div>
    </aside>
  );
}