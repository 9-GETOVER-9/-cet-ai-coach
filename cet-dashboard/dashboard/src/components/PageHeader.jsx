export default function PageHeader({ title, subtitle, hint }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
      {hint && (
        <p className="text-xs text-slate-400 mt-2 italic">{hint}</p>
      )}
    </div>
  );
}
