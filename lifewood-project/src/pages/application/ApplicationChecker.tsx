import { useState } from 'react';
import { Loader2, Clock} from 'lucide-react';
import Button from '../../components/Button';

const ApplicationCheckerData = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        firstname: "Alex",
        lastname: "Rivera",
        dob: "1995-05-12",
        gender: "Non-binary",
        email: "alex.rivera@example.com",
        phone: "+63 917 555 0123",
        position: "AI Data Engineer",
        status: "Pending",
        logs: [
          { status: "Submitted", datetime: "2026-04-28 09:00 AM" },
          { status: "Under Review", datetime: "2026-04-29 02:30 PM" }
        ]
      });
    }, 1500);
  });
}

export default function ApplicationChecker() {
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');

  const handleCheck = async () => {
    setLoading(true);
    const result = await ApplicationCheckerData(appId);
    setData(result);
    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* FORM TITLE - RE-ADDED */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tighter text-darkSerpent">
          Application Status
        </h2>
        <p className="text-darkSerpent/40 text-sm italic">
          Track Your Application
        </p>
      </div>

      {/* Input Section */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter Application ID"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          className="flex-1 px-4 py-3 text-sm rounded-xl bg-seaSalt border border-darkSerpent/10 focus:border-saffaron outline-none transition-all"
        />
        <Button onClick={handleCheck} disabled={loading || !appId} className="px-6 py-3 text-sm rounded-xl">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Search'}
        </Button>
      </div>

      {/* Result Section */}
      <div className="border border-darkSerpent/10 rounded-2xl p-6">
        {!data ? (
          <p className="text-sm text-darkSerpent/40 text-center py-8">Application details will appear here</p>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{data.firstname} {data.lastname}</h3>
                <p className="text-xs text-darkSerpent/50">{data.position}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-earthYellow/10 text-earthYellow uppercase tracking-wider">
                {data.status}
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-darkSerpent/10">
              {['details', 'logs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'details' | 'logs')}
                  className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === tab ? 'text-saffaron border-b-2 border-saffaron' : 'text-darkSerpent/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[160px]">
              {activeTab === 'details' ? (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Email", value: data.email },
                    { label: "Phone", value: data.phone },
                    { label: "DOB", value: data.dob },
                    { label: "Gender", value: data.gender },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest">{item.label}</p>
                      <p className="text-sm font-medium text-darkSerpent">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {data.logs.map((log: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-darkSerpent/5 pb-2">
                      <span className="flex items-center gap-2 text-darkSerpent/70"><Clock className="w-3 h-3"/> {log.status}</span>
                      <span className="text-darkSerpent/30 text-[11px]">{log.datetime}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-darkSerpent/5 flex justify-between items-center">
              {data.status === 'Pending' && (
                <button className="text-[11px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest">Withdraw</button>
              )}
              {/* <button onClick={() => setData(null)} className="text-[11px] text-darkSerpent/30 uppercase tracking-widest hover:text-darkSerpent">Close</button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}