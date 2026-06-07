export default function Empty({ children }) {
  return (
    <div className="card text-center text-slate-400 py-12">
      <div className="text-3xl mb-2">📭</div>
      <div className="text-sm">{children || '还没有数据。跑对应 skill 写一些数据再回来。'}</div>
    </div>
  );
}
