'use client';

import { Search } from 'lucide-react';

const CATEGORIES = [
  { label: 'All',        value: '',           icon: '✦' },
  { label: 'Plumbing',   value: 'Plumbing',   icon: '🔧' },
  { label: 'Electrical', value: 'Electrical', icon: '⚡' },
  { label: 'Painting',   value: 'Painting',   icon: '🎨' },
  { label: 'Joinery',    value: 'Joinery',    icon: '🪵' },
];

interface Props {
  category: string;
  search: string;
  onCategoryChange: (v: string) => void;
  onSearchChange: (v: string) => void;
}

export default function CategoryFilter({ category, search, onCategoryChange, onSearchChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by keyword…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.value;
          return (
            <button
              key={c.value}
              onClick={() => onCategoryChange(c.value)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <span>{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
