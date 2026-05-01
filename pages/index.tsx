import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Papa from 'papaparse';
import Overview from '../components/Overview';
import TaskTable from '../components/TaskTable';
import Timeline from '../components/Timeline';
import SystemControl from '../components/SystemControl';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState('');
  const [isLocalMode, setIsLocalMode] = useState(false);
  const isLocalModeRef = useRef(false);
  
  // Đã gán cứng link CSV để deploy trực tiếp không cần Env Variable
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSX7lh6-W2yLCn-pfIhxalrW2Q6mxTZsUCOtE0o0bHiR48Tu_imTsHzfaVKv5qTENvVP9HgOgwBzLXe/pub?output=csv";

  const fetchData = async () => {
    if (isLocalModeRef.current) return;
    try {
      const res = await fetch(SHEET_CSV_URL);
      const csvText = await res.text();
      
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if(results.data && results.data.length > 0) {
            setData(results.data);
            setLastUpdate(new Date().toLocaleTimeString('en-GB', { hour12: false }));
          }
        }
      });
    } catch (err) {
      console.error('SYNC ERROR', err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // 15s auto polling
    return () => clearInterval(interval);
  }, []);

  if (!data.length) {
    return (
      <div className="bg-luxury-bg min-h-screen flex items-center justify-center font-sans tracking-[0.3em] text-xs uppercase text-luxury-gold">
        Connecting to MasterOS Database...
      </div>
    );
  }

  const systemControlTask = data.find(t => t['ID_TASK'] === 'TASK_012');
  const tasks = data.filter(t => t['ID_TASK'] !== 'TASK_012' && t['ID_TASK']); // Lọc bỏ dòng trống

  const handleUpdateStatus = (taskId: string, newStatus: string) => {
    setIsLocalMode(true);
    isLocalModeRef.current = true;
    setData(prev => prev.map(t => t['ID_TASK'] === taskId ? { ...t, 'Trạng thái (Thực thi)': newStatus } : t));
  };

  return (
    <div className="bg-luxury-bg min-h-screen text-luxury-textPrimary font-sans selection:bg-luxury-gold selection:text-black pb-24">
      <Head>
        <title>MasterOS | Elite Dashboard</title>
      </Head>

      <main className="max-w-[1400px] mx-auto px-8 py-16 md:py-24 space-y-24">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-luxury-border pb-8 gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl text-white tracking-[0.2em] mb-3">MASTEROS</h1>
            <p className="text-[10px] tracking-[0.4em] text-luxury-gold uppercase">Strategic Command Center</p>
          </div>
          <div className="text-[10px] text-luxury-textMuted tracking-[0.2em] flex flex-col md:flex-row items-end md:items-center gap-4 uppercase">
            {isLocalMode && <span className="text-luxury-gold border border-luxury-gold px-2 py-1 bg-luxury-goldDim animate-pulse">LOCAL OVERRIDE (NOT SAVED TO SHEET)</span>}
            <span>SYNC_AT: {lastUpdate}</span>
            <button 
              onClick={fetchData} 
              className="hover:text-luxury-gold transition-colors duration-300 focus:outline-none flex items-center gap-2"
            >
              <span>REFRESH</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
        </header>

        {systemControlTask && <SystemControl data={systemControlTask} />}

        <Overview tasks={tasks} />

        <TaskTable tasks={tasks} onUpdateStatus={handleUpdateStatus} />

        <Timeline tasks={tasks} />

      </main>
    </div>
  );
}
