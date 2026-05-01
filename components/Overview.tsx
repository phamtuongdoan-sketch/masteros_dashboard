export default function Overview({ tasks }: { tasks: any[] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t['Trạng thái (Thực thi)'] === 'Hoàn thành').length;
  const pending = tasks.filter(t => t['Trạng thái (Thực thi)'] === 'Chờ duyệt').length;
  const bottlenecks = tasks.filter(t => t['Bottleneck'] === 'Có').length;
  
  const progress = Math.round((completed / total) * 100) || 0;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-luxury-border">
      <div className="bg-luxury-bg p-8 flex flex-col justify-center">
        <span className="text-[9px] tracking-[0.25em] text-luxury-textMuted uppercase mb-3">Execution Progress</span>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-5xl text-luxury-gold">{progress}</span>
          <span className="text-sm text-luxury-gold">%</span>
        </div>
      </div>
      
      <div className="bg-luxury-bg p-8 flex flex-col justify-center">
        <span className="text-[9px] tracking-[0.25em] text-luxury-textMuted uppercase mb-3">Assets Deployed</span>
        <span className="font-serif text-3xl text-white">{completed} <span className="text-luxury-textMuted text-lg">/ {total}</span></span>
      </div>

      <div className="bg-luxury-bg p-8 flex flex-col justify-center">
        <span className="text-[9px] tracking-[0.25em] text-luxury-textMuted uppercase mb-3">Pending Review</span>
        <span className={`font-serif text-3xl ${pending > 0 ? 'text-luxury-gold' : 'text-white'}`}>{pending}</span>
      </div>

      <div className="bg-luxury-bg p-8 flex flex-col justify-center">
        <span className="text-[9px] tracking-[0.25em] text-luxury-textMuted uppercase mb-3">Active Bottlenecks</span>
        <span className={`font-serif text-3xl ${bottlenecks > 0 ? 'text-luxury-red' : 'text-white'}`}>{bottlenecks}</span>
      </div>
    </section>
  );
}
