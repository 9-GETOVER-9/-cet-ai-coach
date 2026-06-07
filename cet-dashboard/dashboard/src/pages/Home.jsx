import { useApi } from '../api.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Empty from '../components/Empty.jsx';

function daysUntil(date) {
  if (!date) return null;
  const days = Math.ceil((new Date(date) - new Date()) / 86400000);
  return Number.isFinite(days) ? days : null;
}

export default function Home() {
  const { data, error, loading } = useApi('/snapshot');

  if (loading) return <PageHeader title="总览" subtitle="读取 D:\文档\New project\cet-data 数据中..." />;
  if (error) return <Empty title="后端未连接" hint="请确认 npm start 正在运行。" />;

  const profile = data.profile;
  const latest = data.scores.records.at(-1);
  const days = daysUntil(profile?.exam_date);

  return (
    <div className="space-y-6">
      <PageHeader title="备考总览" subtitle="CET-4/CET-6 本地学习档案" />
      {!profile && <Empty title="还没有 D:\文档\New project\cet-data\profile.md" hint="先运行 /cet-diagnose 创建档案，或 npm run seed 生成演示数据。" />}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="考试" value={profile?.exam_type?.toUpperCase() || '-'} />
        <StatCard label="目标分" value={profile?.goal_score || '-'} />
        <StatCard label="剩余天数" value={days ?? '-'} />
        <StatCard label="最近总分" value={latest?.total || profile?.current?.total || '-'} />
      </div>
      <section className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 font-semibold">今日建议</h2>
        <p className="text-sm text-slate-600">优先处理最近分项中最低的一项；没有数据时，先做一次 /cet-diagnose，再从听力或阅读开始建立基线。</p>
      </section>
      {data.issues?.length > 0 && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h2 className="font-semibold">数据格式提醒</h2>
          {data.issues.map((issue, idx) => (
            <p key={idx} className="text-sm text-amber-800">{issue.file}: {issue.error}</p>
          ))}
        </section>
      )}
    </div>
  );
}

