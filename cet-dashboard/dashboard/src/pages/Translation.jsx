import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useApi } from '../api.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Empty from '../components/Empty.jsx';

export default function Translation() {
  const { data, loading } = useApi('/translation');
  if (loading) return <PageHeader title="翻译" />;
  const submissions = data?.submissions || [];
  if (!submissions.length) return <Empty title="暂无翻译记录" hint="使用 /cet-translation 批改一段汉译英后会显示。" />;
  const last = submissions.at(-1);
  const trend = submissions.map((s) => ({ date: s.date, score: s.score.estimated }));

  return (
    <div className="space-y-6">
      <PageHeader title="翻译" subtitle="主题表达与汉译英估分" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="记录数" value={submissions.length} />
        <StatCard label="最近估分" value={last.score.estimated} />
        <StatCard label="主题表达" value={data.key_phrases.length} />
      </div>
      <div className="h-72 rounded-lg border bg-white p-4">
        <ResponsiveContainer>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="score" name="估分" stroke="#111827" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72 rounded-lg border bg-white p-4">
        <ResponsiveContainer>
          <BarChart data={data.top_errors}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tag" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <section className="rounded-lg border bg-white p-4">
        <h2 className="mb-2 font-semibold">主题表达</h2>
        {(data.key_phrases || []).slice(-20).map((p, i) => (
          <p key={i} className="text-sm"><span className="text-slate-500">{p.zh}</span> · {p.en}</p>
        ))}
      </section>
    </div>
  );
}
