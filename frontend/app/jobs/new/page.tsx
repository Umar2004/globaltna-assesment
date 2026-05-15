'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { createJob } from '@/lib/api';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery'];

const CATEGORY_META: Record<string, { icon: string; desc: string }> = {
  Plumbing:   { icon: '🔧', desc: 'Leaks, pipes, boilers, bathrooms' },
  Electrical: { icon: '⚡', desc: 'Wiring, sockets, lighting, EV chargers' },
  Painting:   { icon: '🎨', desc: 'Interior & exterior painting, decorating' },
  Joinery:    { icon: '🪵', desc: 'Doors, windows, fences, fitted furniture' },
};

interface FormData {
  title: string; description: string; category: string;
  location: string; contactName: string; contactEmail: string;
}

interface FormErrors { title?: string; description?: string; contactEmail?: string; }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ title: '', description: '', category: '', location: '', contactName: '', contactEmail: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (form.contactEmail && !EMAIL_RE.test(form.contactEmail)) e.contactEmail = 'Enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError('');
    try {
      await createJob(form);
      router.push('/');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  function field(name: keyof FormData) {
    return {
      value: form[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(prev => ({ ...prev, [name]: e.target.value })),
    };
  }

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50';
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';
  const errorClass = 'mt-1.5 text-xs text-red-500 flex items-center gap-1';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header bar */}
      <div className="gradient-hero px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-blue-200 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to listings
          </Link>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Post a Service Request</h1>
          <p className="mt-1 text-blue-200 text-sm">Fill in the details below and tradespeople will get in touch.</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Side panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">Categories we cover</p>
              {CATEGORIES.map(c => (
                <div
                  key={c}
                  onClick={() => setForm(prev => ({ ...prev, category: c }))}
                  className={`flex items-start gap-3 rounded-xl p-3 cursor-pointer transition-all mb-2 last:mb-0 ${form.category === c ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-slate-50'}`}
                >
                  <span className="text-xl">{CATEGORY_META[c].icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{c}</p>
                    <p className="text-xs text-slate-500">{CATEGORY_META[c].desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800 mb-1">✅ Tips for a great post</p>
              <ul className="text-xs text-emerald-700 space-y-1 list-disc list-inside">
                <li>Be specific about the problem</li>
                <li>Include your location</li>
                <li>Add contact details so trades can reach you</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {serverError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>Title <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Leaking kitchen tap needs fixing" className={inputClass} {...field('title')} />
                  {errors.title && <p className={errorClass}>⚠ {errors.title}</p>}
                </div>

                <div>
                  <label className={labelClass}>Description <span className="text-red-500">*</span></label>
                  <textarea rows={4} placeholder="Describe the work needed in detail. The more specific, the better responses you'll get." className={inputClass} {...field('description')} />
                  {errors.description && <p className={errorClass}>⚠ {errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category</label>
                    <select className={inputClass} {...field('category')}>
                      <option value="">Select a category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_META[c].icon} {c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input type="text" placeholder="e.g. Glasgow" className={inputClass} {...field('location')} />
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Contact Details (optional)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Your Name</label>
                      <input type="text" placeholder="Full name" className={inputClass} {...field('contactName')} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" placeholder="you@example.com" className={inputClass} {...field('contactEmail')} />
                      {errors.contactEmail && <p className={errorClass}>⚠ {errors.contactEmail}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Posting…</span>
                  ) : (
                    <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Post Request</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
