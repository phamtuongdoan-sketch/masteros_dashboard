export default function Timeline({ tasks }: { tasks: any[] }) {
  return (
    <section>
      <h3 className="font-serif text-sm text-white mb-6 tracking-[0.2em] uppercase">Temporal Logs</h3>
      <div className="space-y-4 border-l border-luxury-border pl-6 ml-2">
        {tasks.map((task) => {
          const isUnknown = task['Thời gian bắt đầu (Start Time)'] === 'KHÔNG XÁC ĐỊNH';
          
          return (
            <div key={task['ID_TASK']} className={`relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center ${isUnknown ? 'opacity-30 hover:opacity-70' : 'opacity-100'} transition-opacity duration-300 py-2`}>
              <div className="absolute -left-[29px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-[#333] rounded-full"></div>
              
              <div className="md:col-span-3 text-[10px] tracking-[0.2em] text-[#666] font-mono uppercase">
                {isUnknown ? 'UNREGISTERED' : new Date(task['Thời gian bắt đầu (Start Time)']).toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
              </div>
              <div className="md:col-span-7 text-xs text-[#aaa] font-light truncate">
                {task['Hành động']}
              </div>
              <div className="md:col-span-2 text-left md:text-right text-[9px] tracking-[0.25em] uppercase text-[#555]">
                {task['Thời lượng (Duration)']}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
