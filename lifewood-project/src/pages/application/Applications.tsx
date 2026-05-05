import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Search, ChevronUp, ChevronDown, ChevronsUpDown, Filter, SlidersHorizontal } from 'lucide-react';
import { formatDateTime } from '../../helpers/datetime';
import { fetchAllApplications } from './applicationServices';
import type { ApplicationDetails } from '../types';
import { LoadingScreen } from '../../components/LoadingScreen';
import ApplicationsView from './ApplicationView';
import InputField from '../../components/InputField';


const STATUS_OPTIONS = ['All', 'Pending', 'Shortlisted', 'Hired', 'Not Selected', 'Declined', 'Withdrawn'];

const STATUS_STYLES: Record<string, string> = {
  hired:          'bg-castletonGreen/10 text-castletonGreen border border-castletonGreen/20',
  shortlisted:    'bg-sky-50 text-sky-700 border border-sky-100',
  declined:       'bg-red-50 text-red-600 border border-red-100',
  withdrawn:      'bg-gray-100 text-gray-500 border border-gray-200',
  'not selected': 'bg-amber-50 text-amber-600 border border-amber-100',
  pending:        'bg-saffaron/10 text-saffaron border border-saffaron/20',
};

const getStatusStyle = (s: string) => STATUS_STYLES[s?.toLowerCase()] ?? STATUS_STYLES.pending;
const getStatusLabel = (s: string) => {
  const map: Record<string, string> = {
    hired: 'Hired', shortlisted: 'Shortlisted', declined: 'Declined',
    withdrawn: 'Withdrawn', 'not selected': 'Not Selected',
  };
  return map[s?.toLowerCase()] ?? 'Pending';
};

type SortKey = 'applicationId' | 'name' | 'position' | 'dateSubmitted' | 'status';
type SortDir = 'asc' | 'desc';

export default function Applications() {
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationDetails | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [positionFilter, setPositionFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('dateSubmitted');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const loadApplications = async () => {
    setLoading(true);
    try { const data = await fetchAllApplications(); setApplications(data); }
    catch (_) {}
    finally { setLoading(false); }
  };

  useEffect(() => { loadApplications(); }, []);

  const positions = useMemo(() => {
    const titles = [...new Set(applications.map(a => a.position.title).filter(Boolean))].sort();
    return ['All', ...titles];
  }, [applications]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    let data = [...applications];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(a =>
        a.applicationId.toLowerCase().includes(q) ||
        `${a.applicant.firstname} ${a.applicant.lastname}`.toLowerCase().includes(q) ||
        a.position.title.toLowerCase().includes(q) ||
        a.applicant.email.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'All') data = data.filter(a => getStatusLabel(a.status) === statusFilter);
    if (positionFilter !== 'All') data = data.filter(a => a.position.title === positionFilter);
    data.sort((a, b) => {
      let av = '', bv = '';
      if (sortKey === 'applicationId') { av = a.applicationId; bv = b.applicationId; }
      else if (sortKey === 'name') { av = `${a.applicant.firstname} ${a.applicant.lastname}`; bv = `${b.applicant.firstname} ${b.applicant.lastname}`; }
      else if (sortKey === 'position') { av = a.position.title; bv = b.position.title; }
      else if (sortKey === 'dateSubmitted') { av = a.dateSubmitted; bv = b.dateSubmitted; }
      else if (sortKey === 'status') { av = getStatusLabel(a.status); bv = getStatusLabel(b.status); }
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return data;
  }, [applications, search, statusFilter, positionFilter, sortKey, sortDir]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [search, statusFilter, positionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 opacity-25 ml-1" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-saffaron ml-1" />
      : <ChevronDown className="w-3 h-3 text-saffaron ml-1" />;
  };

  const ThBtn = ({ col, label, idx }: { col: SortKey; label: string; idx: number }) => (
    <th className={`px-5 py-3.5 ${colWidths[idx]}`}>
      <button
        onClick={() => handleSort(col)}
        className="flex items-center text-[11px] uppercase tracking-widest font-bold text-castletonGreen hover:text-darkSerpent transition-colors cursor-pointer whitespace-nowrap"
      >
        {label}<SortIcon col={col} />
      </button>
    </th>
  );

  const colWidths = ['w-[14%]', 'w-[22%]', 'w-[22%]', 'w-[20%]', 'w-[22%]'];

  return (
  <div className="flex flex-col h-full gap-5">
    {/* Header */}
    <div className="flex-shrink-0 flex items-start justify-between">
      <div>
        <h2 className="text-3xl font-bold text-darkSerpent">Applications</h2>
        <p className="text-gray-500 text-sm mt-1">Review, track, and manage all incoming job applications</p>
      </div>
    </div>

    {/* Search + Filters */}
    <div className="flex-shrink-0 flex gap-3 items-center">
      <div className="flex-1">
        <InputField
          icon={<Search />}
          value={search}
          onChange={e => { setSearch((e.target as HTMLInputElement).value); setCurrentPage(1); }}
          placeholder="Search by name, ID, position or email..."
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-darkSerpent/30" />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="pl-8 pr-8 py-2.5 bg-white border border-seaSalt rounded-xl text-sm outline-none focus:ring-2 ring-saffaron/40 transition-all appearance-none cursor-pointer text-darkSerpent font-medium"
        >
          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="relative">
        <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-darkSerpent/30" />
        <select
          value={positionFilter}
          onChange={e => setPositionFilter(e.target.value)}
          className="pl-8 pr-8 py-2.5 bg-white border border-seaSalt rounded-xl text-sm outline-none focus:ring-2 ring-saffaron/40 transition-all appearance-none cursor-pointer text-darkSerpent font-medium max-w-[180px]"
        >
          {positions.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
    </div>

    {/* Main Table Container */}
    <div className="flex-1 bg-white rounded-2xl border border-seaSalt shadow-sm flex flex-col overflow-hidden">
      
      {/* Editorial Header with Sorting */}
      <div className="flex-shrink-0 bg-castletonGreen/[0.04] border-b border-castletonGreen/10">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <ThBtn col="applicationId" label="Application No." idx={0} />
              <ThBtn col="name" label="Applicant" idx={1} />
              <ThBtn col="position" label="Position" idx={2} />
              <ThBtn col="dateSubmitted" label="Submitted" idx={3} />
              <ThBtn col="status" label="Status" idx={4} />
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable Table Body */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingScreen message="Loading..." variant="full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-darkSerpent/30">
            <Briefcase className="w-10 h-10 mb-3 opacity-20" />
            <p className="text-sm font-medium">No applications found</p>
          </div>
        ) : (
          <table className="w-full table-fixed">
            <tbody className="divide-y divide-seaSalt/30">
              {paginatedData.map((app) => (
                <motion.tr
                  key={app.applicationId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedApplication(app)}
                  className="hover:bg-saffaron/7 transition-colors cursor-pointer group"
                >
                  <td className={`px-6 py-5 ${colWidths[0]}`}>
                    <span className="text-[11px] font-bold text-castletonGreen/50">{app.applicationId}</span>
                  </td>
                  <td className={`px-6 py-5 ${colWidths[1]}`}>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-darkSerpent group-hover:text-saffaron transition-colors truncate">
                        {app.applicant.firstname} {app.applicant.lastname}
                      </span>
                      <span className="text-[11px] text-darkSerpent/40 truncate">{app.applicant.email}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-5 ${colWidths[2]}`}>
                    <span className="text-[13px] text-darkSerpent/70 truncate block font-medium">{app.position.title}</span>
                  </td>
                  <td className={`px-6 py-5 ${colWidths[3]}`}>
                    <span className="text-[12px] text-darkSerpent/50">{formatDateTime(app.dateSubmitted)}</span>
                  </td>
                  <td className={`px-6 py-5 ${colWidths[4]}`}>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getStatusStyle(app.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${app.status === 'hired' ? 'bg-castletonGreen' : 'bg-current'}`} />
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer: Pagination Only */}
      <div className="flex-shrink-0 p-4 border-t border-seaSalt flex items-center justify-between bg-white">
        <div className="flex items-center gap-3 text-[11px] font-bold text-darkSerpent/50">
          <span>Showing</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="bg-seaSalt/50 border border-seaSalt rounded-lg px-2 py-1 outline-none text-darkSerpent cursor-pointer focus:ring-1 ring-saffaron"
          >
            {[5, 10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span>per page</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 hover:bg-seaSalt/50 disabled:opacity-30 transition-all">Prev</button>
          <span className="text-[11px] font-mono font-bold text-darkSerpent/30 px-2">{currentPage} / {totalPages}</span>
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-darkSerpent/60 hover:bg-seaSalt/50 disabled:opacity-30 transition-all">Next</button>
        </div>
      </div>
    </div>

    <AnimatePresence>
      {selectedApplication && (
        <ApplicationsView
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusUpdate={loadApplications}
        />
      )}
    </AnimatePresence>
  </div>
);
}

