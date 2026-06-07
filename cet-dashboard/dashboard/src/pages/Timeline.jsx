import { useApi } from '../api.js';
import PageHeader from '../components/PageHeader.jsx';
import Empty from '../components/Empty.jsx';

const TYPE = {
  writing: '写作',
  reading: '阅读',
  listening: '听力',
  translation: '翻译',
  vocab: '词汇',
};

export default function Timeline() {
  const { data, loading } = useApi('/timeline');
  if (loading) return <PageHeader title="时间线" />;
  const events = data?.events || [];
  if (!events.length) return <Empty title="暂无时间线" hint="产生练习记录后会显示。" />;

  return (
    <div className="space-y-6">
      <PageHeader title="时间线" />
      <section className="rounded-lg border bg-white p-4">
        {events.slice().reverse().map((e, i) => (
          <div key={i} className="border-b py-3 last:border-b-0">
            <div className="text-sm text-slate-500">{e.date} · {TYPE[e.type] || e.type}</div>
            <div className="font-medium">{e.label}</div>
            {e.score != null && <div className="text-sm text-slate-600">结果：{e.score}</div>}
          </div>
        ))}
      </section>
    </div>
  );
}
