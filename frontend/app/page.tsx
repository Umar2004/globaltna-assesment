'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { PlusCircle, Wrench } from 'lucide-react';
import { getJobs, Job } from '@/lib/api';
import JobCard from '@/components/JobCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getJobs({ category, search: debouncedSearch });
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [category, debouncedSearch]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const open = jobs.filter(j => j.status === 'Open').length;
  const inProgress = jobs.filter(j => j.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="gradient-hero text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                  <Wrench className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-200">GlobalTNA Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Service Request Board
              </h1>
              <p className="mt-2 text-blue-200 text-sm sm:text-base max-w-md">
                Connect homeowners with skilled tradespeople across the UK. Browse open requests or post your own.
              </p>
            </div>

            <Link
              href="/jobs/new"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-lg hover:bg-blue-50 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              Post a Request
            </Link>
          </div>

          {/* Stats strip */}
          {!loading && !error && (
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { label: 'Total Requests', value: jobs.length },
                { label: 'Open',           value: open,       color: 'text-emerald-300' },
                { label: 'In Progress',    value: inProgress, color: 'text-amber-300' },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white/10 backdrop-blur px-5 py-3 text-center min-w-[90px]">
                  <p className={`text-2xl font-bold ${s.color ?? 'text-white'}`}>{s.value}</p>
                  <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Filters */}
        <div className="mb-8 rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <CategoryFilter
            category={category}
            search={search}
            onCategoryChange={setCategory}
            onSearchChange={setSearch}
          />
        </div>

        {/* Results header */}
        {!loading && !error && (
          <p className="mb-4 text-sm text-slate-500">
            {jobs.length === 0 ? 'No jobs found' : `Showing ${jobs.length} request${jobs.length === 1 ? '' : 's'}`}
            {category && <span className="ml-1">in <strong className="text-slate-700">{category}</strong></span>}
            {debouncedSearch && <span className="ml-1">for <strong className="text-slate-700">"{debouncedSearch}"</strong></span>}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <p className="text-sm text-red-400 mt-1">Make sure the backend server is running on port 5000.</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 p-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold text-slate-700">No requests found</p>
            <p className="text-sm text-slate-400 mt-1">Try a different category or{' '}
              <Link href="/jobs/new" className="text-blue-600 hover:underline">post the first request</Link>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
}
