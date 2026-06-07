import clsx from 'clsx';

export default function StatCard({ label, value, sub, hint, accent }) {
  return (
    <div className="card">
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className={clsx('stat-num text-3xl mt-2', accent && 'text-emerald-600')}>
        {value ?? '—'}
      </div>
      {sub && <div className="text-sm text-slate-500 mt-1">{sub}</div>}
      {hint && <div className="text-xs text-slate-400 mt-2">{hint}</div>}
    </div>
  );
}
