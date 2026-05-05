import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Button from '../../components/Button';
import { getApplicationDetails } from './applicationServices';
import type { ApplicationDetails } from '../types';
import { formatDateTime } from '../../helpers/datetime';
import InputField from '../../components/InputField';

export default function ApplicationChecker() {
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApplicationDetails | null>(null);
  const [error, setError] = useState<string>('');

  const handleCheck = async () => {
    if (!appId.trim()) {
      setError('Please enter an Application ID');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);
    
    try {
      const result = await getApplicationDetails(appId.trim());
      
      const sortedLogs = [...result.logs].sort((a, b) => 
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
      
      setData({ ...result, logs: sortedLogs });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch application details');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Input Section */}
      <div className="flex gap-3 mt-2 items-start">
        <div className="flex-1">
          <InputField
            type="text"
            placeholder="Enter Application ID..."
            value={appId}
            onChange={(e) => setAppId((e.target as HTMLInputElement).value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button 
          onClick={handleCheck} 
          disabled={loading || !appId} 
          className="text-xs rounded-xl px-8"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'SEARCH'}
        </Button>
      </div>

      {/* Integrated Timeline Layout */}
      <div className={`
        bg-white border rounded-3xl shadow-sm
        ${error ? '!bg-red-50 !border-red-500  tsxt-sm uppercase tracking-[0.1em]' : 'border-seaSalt'}
      `}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-saffaron mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent/30">Syncing Record...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center text-red-600 font-medium text-sm">
            {error}
          </div>
        ) : data ? (
         <div className="max-w-2xl mx-auto pb-6">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-darkSerpent/30 py-6 text-center">
            Application Progress
          </p>

          <div className="space-y-10">
            {data.logs.map((log, i) => {
              const isLatest = i === 0;
              return (
                <div key={i} className="relative pl-8">
                  {/* Connector Line: Now perfectly aligned to the center of the nodes */}
                  {i !== data.logs.length - 1 && (
                    <div className="absolute left-[3px] top-[14px] bottom-[-40px] w-[2px] bg-darkSerpent/10" />
                  )}

                  {/* Timeline Node: Increased z-index to stay above the line */}
                  <div className={`absolute left-[-5px] top-[1px] w-4 h-4 rounded-full border-[3px] border-white z-10
                    ${isLatest ? 'bg-saffaron ring-2 ring-saffaron/20' : 'bg-darkSerpent/20'}`} 
                  />
                  
                  {/* Content Row: Improved spacing and alignment */}
                  <div className="flex items-center justify-between gap-6 pb-2">
                    {isLatest ? (
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-saffaron/10 text-saffaron text-[11px] font-black uppercase tracking-wider">
                        {log.status}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-darkSerpent/60">{log.status}</p>
                    )}
                    
                    <p className="text-xs text-darkSerpent/30 font-medium whitespace-nowrap tabular-nums">
                      {formatDateTime(log.datetime)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-darkSerpent/20">Application Details will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}