import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Job } from '@/lib/api';
import StatusBadge from './StatusBadge';

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  Plumbing:   { bg: 'bg-blue-50',   text: 'text-blue-700',   icon: '🔧' },
  Electrical: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: '⚡' },
  Painting:   { bg: 'bg-purple-50', text: 'text-purple-700', icon: '🎨' },
  Joinery:    { bg: 'bg-orange-50', text: 'text-orange-700', icon: '🪵' },
};

const defaultColor = { bg: 'bg-slate-50', text: 'text-slate-600', icon: '🔨' };

export default function JobCard({ job }: { job: Job }) {
  const cat = job.category ? (categoryColors[job.category] ?? defaultColor) : defaultColor;

  return (
    <div className="card-hover group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Top accent strip */}
      <div className={`h-1.5 w-full ${job.category === 'Plumbing' ? 'bg-blue-500' : job.category === 'Electrical' ? 'bg-yellow-500' : job.category === 'Painting' ? 'bg-purple-500' : job.category === 'Joinery' ? 'bg-orange-500' : 'bg-slate-400'}`} />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category + status row */}
        <div className="flex items-center justify-between gap-2">
          {job.category ? (
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cat.bg} ${cat.text}`}>
              <span>{cat.icon}</span>
              {job.category}
            </span>
          ) : (
            <span />
          )}
          <StatusBadge status={job.status} />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 text-[15px] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {job.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-1 border-t border-slate-100">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Calendar className="h-3 w-3" />
            {new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/jobs/${job._id}`}
        className="flex items-center justify-center gap-2 bg-slate-50 border-t border-slate-100 px-5 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors group/btn"
      >
        View Details
        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
