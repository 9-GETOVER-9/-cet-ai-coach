import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApi } from '../api.js';
import PageHeader from '../components/PageHeader.jsx';
import Empty from '../components/Empty.jsx';

export default function Trends() {
  const { data, loading } = useApi('/scores');
  if (loading) return <PageHeader title="分数趋势" />;
  const records = data?.records || [];
  if (!records.length) return <Empty title="暂无分数记录" hint="运行 /cet-diagnose 或录入模考后显示。" />;

  return (
    <div className="space-y-6">
      <PageHeader title="分数趋势" subtitle="710 分制" />
      <div className="h-96 rounded-lg border bg-white p-4">
        <ResponsiveContainer>
          <LineChart data={records}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 710]} />
            <Tooltip />
            <Legend />
            <Line dataKey="total" name="总分" stroke="#111827" />
            <Line dataKey="listening" name="听力" stroke="#2563eb" />
            <Line dataKey="reading" name="阅读" stroke="#16a34a" />
            <Line dataKey="writing_translation" name="写作翻译" stroke="#dc2626" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
