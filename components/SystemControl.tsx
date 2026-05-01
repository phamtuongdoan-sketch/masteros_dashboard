export default function SystemControl({ data }: { data: any }) {
  const isPivot = data['Quyết định'] === 'Pivot';

  return (
    <section className="border border-luxury-border p-8 md:p-12 relative overflow-hidden group hover:border-[#333] transition-colors duration-500 bg-luxury-surface">
      <div className={`absolute top-0 left-0 w-1 h-full ${isPivot ? 'bg-luxury-red' : 'bg-luxury-gold'}`}></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-1 lg:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="font-serif text-xl text-white uppercase tracking-[0.15em]">{data['Hành động']}</h2>
            <span className="text-[9px] tracking-[0.2em] border border-luxury-border px-2 py-1 text-luxury-textMuted">SYSTEM LAYER</span>
          </div>
          <p className="text-[#999] text-xs font-light leading-relaxed max-w-2xl">{data['Mục đích']}</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="block text-[9px] tracking-[0.2em] text-luxury-textMuted uppercase mb-2">Next Action Sequence</span>
              <p className="text-xs text-[#ccc] leading-relaxed font-light">{data['NEXT ACTION']}</p>
            </div>
            <div>
              <span className="block text-[9px] tracking-[0.2em] text-luxury-textMuted uppercase mb-2">Execution Trigger</span>
              <p className="text-xs text-[#ccc] leading-relaxed font-light">{data['Điều kiện kích hoạt']}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center lg:items-end border-t lg:border-t-0 lg:border-l border-luxury-border pt-8 lg:pt-0 lg:pl-12">
          <span className="text-[9px] tracking-[0.2em] text-luxury-textMuted uppercase mb-4">Master Decision</span>
          <span className={`font-serif text-3xl tracking-[0.1em] uppercase ${isPivot ? 'text-luxury-red' : 'text-luxury-gold'}`}>
            {data['Quyết định']}
          </span>
          <div className="mt-4 flex flex-col lg:items-end gap-2 text-[10px] tracking-widest uppercase">
            <span className="text-luxury-textMuted">Status: <span className="text-white">{data['Trạng thái (Thực thi)']}</span></span>
            <span className="text-luxury-textMuted">Risk Level: <span className="text-white">{data['Rủi ro']}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
