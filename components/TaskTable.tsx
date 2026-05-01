export default function TaskTable({ tasks, onUpdateStatus }: { tasks: any[], onUpdateStatus?: (id: string, status: string) => void }) {
  return (
    <section>
      <h3 className="font-serif text-sm text-white mb-6 tracking-[0.2em] uppercase">Operations Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap md:whitespace-normal">
          <thead>
            <tr className="text-[9px] tracking-[0.2em] text-luxury-textMuted uppercase border-b border-luxury-border">
              <th className="pb-4 font-normal px-4">Task ID</th>
              <th className="pb-4 font-normal w-1/4">Directive</th>
              <th className="pb-4 font-normal">State</th>
              <th className="pb-4 font-normal">Command</th>
              <th className="pb-4 font-normal">Completion</th>
              <th className="pb-4 font-normal">Next Action</th>
              <th className="pb-4 font-normal text-right pr-4">Control</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {tasks.map((task) => {
              const isBottleneck = task['Bottleneck'] === 'Có';
              const isPending = task['Trạng thái (Thực thi)'] === 'Chờ duyệt';
              
              let rowClass = "group border-b border-[#111] hover:bg-[#151515] transition-colors duration-300 ";
              if (isBottleneck) rowClass += "bg-luxury-redDim hover:bg-[#1A0A0A] border-l-[3px] border-l-luxury-red";
              else if (isPending) rowClass += "bg-luxury-goldDim hover:bg-[#181810] border-l-[3px] border-l-luxury-gold";
              else rowClass += "border-l-[3px] border-l-transparent";

              return (
                <tr key={task['ID_TASK']} className={rowClass}>
                  <td className="py-5 px-4 text-[#777] font-mono text-[10px]">{task['ID_TASK']}</td>
                  <td className="py-5 pr-6 text-[#ccc] font-light leading-relaxed">{task['Hành động']}</td>
                  <td className="py-5 pr-4">
                    <span className={`text-[9px] uppercase tracking-[0.15em] border px-2 py-1 ${isPending ? 'text-luxury-gold border-luxury-gold' : isBottleneck ? 'text-luxury-red border-luxury-red' : 'text-[#888] border-[#333]'}`}>
                      {task['Trạng thái (Thực thi)']}
                    </span>
                  </td>
                  <td className="py-5 text-[#999] uppercase text-[10px] tracking-[0.2em]">{task['Quyết định']}</td>
                  <td className="py-5 pr-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#666] font-mono w-6">{task['% tiến độ (Hoàn thành)']}</span>
                      <div className="w-20 h-[1px] bg-luxury-border relative">
                        <div className="absolute top-0 left-0 h-full bg-luxury-gold transition-all duration-1000" style={{ width: `${task['% tiến độ (Hoàn thành)']}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-[11px] text-[#888] font-light truncate max-w-[200px] md:max-w-xs">{task['NEXT ACTION']}</td>
                  <td className="py-5 text-right pr-4 text-[9px] uppercase tracking-[0.1em] space-x-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => onUpdateStatus && onUpdateStatus(task['ID_TASK'], 'Hoàn thành')} className="text-luxury-textMuted hover:text-white transition-colors">Hoàn thành</button>
                    <button onClick={() => onUpdateStatus && onUpdateStatus(task['ID_TASK'], 'Chờ duyệt')} className="text-luxury-textMuted hover:text-luxury-gold transition-colors">Chờ duyệt</button>
                    <button onClick={() => onUpdateStatus && onUpdateStatus(task['ID_TASK'], 'Tạm dừng')} className="text-luxury-textMuted hover:text-luxury-red transition-colors">Tạm dừng</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
