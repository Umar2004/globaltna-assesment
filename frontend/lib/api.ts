const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type JobStatus = 'Open' | 'In Progress' | 'Closed';

export interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: JobStatus;
  createdAt: string;
}

export interface JobFilters {
  category?: string;
  status?: string;
  search?: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function getJobs(filters: JobFilters = {}): Promise<Job[]> {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('search', filters.search);
  const qs = params.toString();
  return request<Job[]>(`/api/jobs${qs ? `?${qs}` : ''}`);
}

export function getJob(id: string): Promise<Job> {
  return request<Job>(`/api/jobs/${id}`);
}

export function createJob(data: Omit<Job, '_id' | 'createdAt' | 'status'>): Promise<Job> {
  return request<Job>('/api/jobs', { method: 'POST', body: JSON.stringify(data) });
}

export function updateJobStatus(id: string, status: JobStatus): Promise<Job> {
  return request<Job>(`/api/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteJob(id: string): Promise<void> {
  return request<void>(`/api/jobs/${id}`, { method: 'DELETE' });
}
