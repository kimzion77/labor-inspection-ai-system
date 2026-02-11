import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, UserPlus, FileSignature, Banknote, Clock, LogOut } from 'lucide-react';
import MobileLayout from '../components/laborGuide/layout/MobileLayout';
import situationsData from '../data/laborLaw/situations.json';

const iconMap = { UserPlus, FileSignature, Banknote, Clock, LogOut };
const colorMap = {
    'hiring': { bg: 'bg-blue-50', iconBg: 'bg-primary', text: 'text-primary' },
    'contract': { bg: 'bg-white', iconBg: 'bg-navy-deep', text: 'text-navy-deep' },
    'wages': { bg: 'bg-white', iconBg: 'bg-navy-deep', text: 'text-navy-deep' },
    'workingHours': { bg: 'bg-white', iconBg: 'bg-navy-deep', text: 'text-navy-deep' },
    'termination': { bg: 'bg-white', iconBg: 'bg-navy-deep', text: 'text-navy-deep' },
};

function SituationGuide() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        if (!searchQuery) return situationsData;
        return situationsData.filter(s =>
            s.title.includes(searchQuery) || s.description.includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <MobileLayout title="상황별 빠른 안내">
            {/* 검색바 */}
            <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 mb-4 shadow-sm border border-gray-border">
                <Search size={18} className="text-gray-text" />
                <input
                    className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
                    placeholder="검색 (Search)"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            {/* 상황 카드 리스트 */}
            <div className="space-y-3">
                {filtered.map(situation => {
                    const Icon = iconMap[situation.icon] || FileSignature;
                    const colors = colorMap[situation.id] || colorMap.contract;

                    return (
                        <button
                            key={situation.id}
                            onClick={() => navigate(`/labor-guide/situations/${situation.id}`)}
                            className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform text-left border border-gray-border"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.iconBg}`}>
                                <Icon size={22} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[15px] font-bold text-navy-deep">{situation.title}</div>
                                <div className="text-xs text-gray-text mt-0.5 leading-relaxed truncate">{situation.description}</div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 shrink-0" />
                        </button>
                    );
                })}
            </div>
        </MobileLayout>
    );
}

export default SituationGuide;
