import { JobStatus } from '@/lib/api';

const styles: Record<JobStatus, string> = {
  Open:          'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'In Progress': 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  Closed:        'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
};

const dots: Record<JobStatus, string> = {
  Open:          'bg-emerald-500',
  'In Progress': 'bg-amber-500',
  Closed:        'bg-slate-400',
};

export default function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
