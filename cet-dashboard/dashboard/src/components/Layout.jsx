import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const NAV = [
  ['/', '总览'],
  ['/trends', '分数趋势'],
  ['/writing', '写作'],
  ['/reading', '阅读'],
  ['/listening', '听力'],
  ['/translation', '翻译'],
  ['/vocab', '词汇'],
  ['/timeline', '时间线'],
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-slate-200 bg-white p-5 md:block">
        <div className="mb-8">
          <div className="text-lg font-semibold">CET Coach</div>
          <div className="text-sm text-slate-500">四/六级本地仪表盘</div>
        </div>
        <nav className="space-y-1">
          {NAV.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => clsx(
                'block rounded-md px-3 py-2 text-sm',
                isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100',
              )}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="md:pl-60">
        <div className="mx-auto max-w-6xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
