import { useApi } from '../api.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Empty from '../components/Empty.jsx';

export default function Vocab() {
  const { data, loading } = useApi('/vocab');
  if (loading) return <PageHeader title="词汇" />;
  const summary = data?.summary;
  if (!summary?.current_day) return <Empty title="暂无词汇记录" hint="使用 /cet-vocab 开始 Day 1。" />;

  return (
    <div className="space-y-6">
      <PageHeader title="词汇" subtitle="高频词、难词池、已掌握词" />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Day" value={summary.current_day} />
        <StatCard label="推词" value={summary.total_pushed} />
        <StatCard label="已掌握" value={summary.total_mastered} />
        <StatCard label="难词" value={summary.total_difficult} />
      </div>
      <section className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 font-semibold">最近难词</h2>
        {data.difficult.slice(-30).map((w, i) => (
          <span key={i} className="mr-2 mb-2 inline-block rounded bg-slate-100 px-2 py-1 text-sm">{w.word}</span>
        ))}
      </section>
    </div>
  );
}
