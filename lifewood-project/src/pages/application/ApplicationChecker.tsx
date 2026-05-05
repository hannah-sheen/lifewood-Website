import { useState } from 'react';
import { Loader2, Clock, FileText, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import Button from '../../components/Button';
import { getApplicationDetails } from './applicationServices';
import type { ApplicationDetails } from '../types';
import { formatDateTime, formatDate } from '../../helpers/datetime';
import InputField from '../../components/InputField';

export default function ApplicationChecker() {
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApplicationDetails | null>(null);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'logs'>('details');

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
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch application details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-saffaron/10 text-saffaron';
      case 'under review':
        return 'bg-blue-100 text-blue-700';
      case 'shortlisted':
        return 'bg-castletonGreen/10 text-castletonGreen';
      case 'hired':
        return 'bg-green-100 text-green-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* Input Section */}
      <div className="flex gap-3">
        <div className="flex-1">
          <InputField
            type="text"
            placeholder="Enter Application ID (e.g., APP020526-001)"
            value={appId}
            onChange={(e) => setAppId((e.target as HTMLInputElement).value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button onClick={handleCheck} disabled={loading || !appId} className="text-sm rounded-xl">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Search'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Result Section */}
      <div className="border border-darkSerpent/10 rounded-2xl p-4">
        {!data && !loading && !error && (
          <p className="text-sm text-darkSerpent/40 text-center py-8">
            Application details will appear here
          </p>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin w-8 h-8 text-saffaron" />
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-darkSerpent">
                  {data.applicant.firstname} {data.applicant.lastname}
                </h3>
                <p className="text-sm text-darkSerpent/60 mt-1">{data.position.title}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(data.status)}`}>
                  {data.status}
                </span>
                <p className="text-xs text-darkSerpent/30 mt-2">
                  Submitted: {formatDateTime(data.dateSubmitted)}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-darkSerpent/10">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                  activeTab === 'details' ? 'text-saffaron border-b-2 border-saffaron' : 'text-darkSerpent/30 hover:text-darkSerpent/60'
                }`}
              >
                <User className="w-3 h-3" /> Personal Details
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                  activeTab === 'logs' ? 'text-saffaron border-b-2 border-saffaron' : 'text-darkSerpent/30 hover:text-darkSerpent/60'
                }`}
              >
                <Clock className="w-3 h-3" /> Application Timeline ({data.logs.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-4">
                {activeTab === 'details' ? (
                    <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                        </p>
                        <p className="text-sm font-medium text-darkSerpent truncate">{data.applicant.email}</p>
                        </div>
                        <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Phone
                        </p>
                        <p className="text-sm font-medium text-darkSerpent">{data.applicant.phone}</p>
                        </div>
                        <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Date of Birth
                        </p>
                        <p className="text-sm font-medium text-darkSerpent">
                            {formatDate(data.applicant.dob)}
                        </p>
                        </div>
                        <div>
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest">Gender</p>
                        <p className="text-sm font-medium text-darkSerpent">{data.applicant.gender}</p>
                        </div>
                        <div className="col-span-2">
                        <p className="text-[9px] uppercase font-bold text-darkSerpent/30 tracking-widest flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Address
                        </p>
                        <p className="text-sm font-medium text-darkSerpent leading-snug">{data.applicant.address}</p>
                        </div>
                    </div>
                    
                    {data.applicant.resume && (
                        <a 
                        href={data.applicant.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-saffaron hover:underline inline-flex items-center gap-1 font-bold pt-1"
                        >
                        <FileText className="w-3 h-3" /> View Resume
                        </a>
                    )}
                    </div>
                ) : (
                   <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-darkSerpent/10 scrollbar-track-transparent">
                     {data.logs.length === 0 ? (
                    <p className="text-sm text-darkSerpent/40 text-center py-4">No timeline updates yet</p>
                    ) : (
                    data.logs.map((log, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-darkSerpent/5 pb-2 last:border-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-saffaron" />
                            <span className="text-xs font-medium text-darkSerpent/80">{log.status}</span>
                        </div>
                        <span className="text-darkSerpent/30 text-xs whitespace-nowrap ml-4">
                            {formatDateTime(log.datetime)}
                        </span>
                        </div>
                    ))
                    )}
                </div>
                )}
                </div>
          </div>
        )}
      </div>
    </div>
  );
}