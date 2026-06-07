import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useApi } from '../api.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Empty from '../components/Empty.jsx';

export default function Reading() {
  const { data, loading } = useApi('/reading');
  const synonyms = useApi('/synonyms');
  if (loading) return <PageHeader title="阅读" />;
  const submissions = data?.submissions || [];
  if (!submissions.length) return <Empty title="暂无阅读记录" hint="使用 /cet-reading 分析一次阅读后会显示。" />;
  const last = submissions.at(-1);
  const trend = submissions.map((s) => ({ date: s.date, accuracy: s.accuracy, score: s.estimated }));

  return (
    <div className="space-y-6">
      <PageHeader title="阅读" subtitle="选词填空、长篇匹配、仔细阅读" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="记录数" value={submissions.length} />
        <StatCard label="最近正确率" value={`${Math.round(last.accuracy * 100)}%`} />
        <StatCard label="同义替换" value={synonyms.data?.count || 0} />
      </div>
      <div className="h-72 rounded-lg border bg-white p-4">
        <ResponsiveContainer>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="accuracy" name="正确率" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72 rounded-lg border bg-white p-4">
        <ResponsiveContainer>
          <BarChart data={data.question_type_distribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="accuracy" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
