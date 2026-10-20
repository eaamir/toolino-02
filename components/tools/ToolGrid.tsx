"use client";

import { useState } from "react";
import ToolCard from "./ToolCard";
import { tools } from "@/data/tools";

export default function ToolGrid() {
  const [search, setSearch] = useState("");

  const popularTools = tools.slice(0, 3);

  const query = search.trim().toLowerCase();

  const filteredTools = query
    ? tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query),
      )
    : tools;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Search + Popular */}
      <div className="mb-5 flex shrink-0 items-center justify-between gap-4">
        {/* Popular Glass */}
        <div
          dir="rtl"
          className="
    flex min-w-0 items-center gap-2
    rounded-xl
    border border-white/10
    bg-white/[0.055]
    px-3 py-2
    backdrop-blur-xl
  "
        >
          <span className="shrink-0 text-xs text-zinc-500">محبوب</span>

          <div className="flex gap-1.5 overflow-hidden">
            {popularTools.map((tool) => (
              <button
                key={tool.href}
                type="button"
                onClick={() => setSearch(tool.title)}
                className="
          shrink-0 cursor-pointer
          rounded-lg
          border border-white/[0.06]
          bg-white/[0.035]
          px-3 py-1.5
          text-xs text-zinc-400
          transition
          hover:bg-white/[0.08]
          hover:text-white
        "
              >
                {tool.title}
              </button>
            ))}
          </div>
        </div>
        {/* Search Glass */}
        <div className="relative w-full max-w-md shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی ابزار..."
            dir="rtl"
            className="
      h-12 w-full rounded-xl
      border border-white/10
      bg-white/[0.055]
      px-4 pl-24
      text-sm text-white
      backdrop-blur-xl
      outline-none
      transition-all duration-200
      placeholder:text-zinc-500
      hover:bg-white/[0.07]
      focus:border-white/15
      focus:bg-white/[0.08]
    "
          />

          {search.length > 0 && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
        absolute left-2 top-1/2
        -translate-y-1/2
        cursor-pointer
        rounded-lg
        px-2.5 py-1.5
        text-xs text-zinc-500
        transition
        hover:bg-white/[0.07]
        hover:text-white
      "
            >
              پاک کردن
            </button>
          )}
        </div>
      </div>

      {/* Tools */}
      {filteredTools.length > 0 ? (
        <div className="tool-scroll p-2 min-h-0 flex-1 overflow-y-auto ">
          <div className="grid gap-5 pb-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.href}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          dir="rtl"
          className="flex flex-1 items-center justify-center text-sm text-zinc-400"
        >
          ابزاری پیدا نشد
        </div>
      )}
    </div>
  );
}
