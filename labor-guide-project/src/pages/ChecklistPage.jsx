import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, AlertTriangle, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import MobileLayout from '../components/laborGuide/layout/MobileLayout';
import obligationsData from '../data/laborLaw/obligations.json';

const SIZE_LABELS = { 1: '5인 미만', 5: '5인 이상', 10: '10인 이상', 30: '30인 이상', 50: '50인 이상' };
const STORAGE_KEY = 'labor-guide-checked';

function ChecklistPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sizeParam = parseInt(searchParams.get('size') || '5');
    const sizeLabel = SIZE_LABELS[sizeParam] || `${sizeParam}인 이상`;

    const [checkedItems, setCheckedItems] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    }, [checkedItems]);

    const filtered = useMemo(() => {
        return obligationsData.filter(ob => {
            const min = ob.applicability?.minEmployees || 1;
            return min <= sizeParam;
        });
    }, [sizeParam]);

    const total = filtered.length;
    const checked = filtered.filter(ob => checkedItems[ob.id]).length;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <MobileLayout title={`${sizeLabel} 사업장`}>
            {/* 이행률 프로그레스 */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${percent >= 70 ? 'bg-success' : percent >= 40 ? 'bg-warning' : 'bg-danger'}`}>
                            {percent}%
                        </div>
                        <div>
                            <div className="text-sm font-bold text-navy-deep">이행률 {percent}%</div>
                            <div className="text-xs text-gray-text">{checked}/{total}</div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/labor-guide')} className="text-gray-text">
                        <Settings size={20} />
                    </button>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full progress-bar-animate ${percent >= 70 ? 'bg-success' : percent >= 40 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>

            {/* 의무사항 리스트 */}
            <div className="space-y-2.5">
                {filtered.map(ob => {
                    const isChecked = !!checkedItems[ob.id];
                    const isExpanded = expandedId === ob.id;

                    return (
                        <div
                            key={ob.id}
                            className={`bg-white rounded-xl overflow-hidden shadow-sm border-l-4 transition-colors ${isChecked ? 'border-l-success' : 'border-l-danger'}`}
                        >
                            {/* 카드 헤더 */}
                            <div className="flex items-start gap-3 p-4">
                                {/* 체크박스 */}
                                <button
                                    onClick={() => toggleCheck(ob.id)}
                                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 check-transition ${isChecked ? 'bg-success border-success' : 'border-gray-300 bg-white'}`}
                                >
                                    {isChecked && <Check size={14} color="white" strokeWidth={3} />}
                                </button>

                                {/* 내용 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className={`text-sm font-semibold leading-snug ${isChecked ? 'text-gray-400 line-through' : 'text-navy-deep'}`}>
                                                {ob.title}
                                            </div>
                                            <div className="text-xs text-primary mt-1 font-medium">{ob.legalBasis}</div>
                                        </div>
                                        <button onClick={() => setExpandedId(prev => prev === ob.id ? null : ob.id)} className="text-gray-text shrink-0">
                                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </button>
                                    </div>

                                    {/* 미이행 과태료 경고 - 항상 표시 */}
                                    {!isChecked && (
                                        <div className="mt-2 flex items-start gap-1.5 bg-red-50 rounded-lg px-3 py-2">
                                            <AlertTriangle size={14} className="text-danger shrink-0 mt-0.5" />
                                            <span className="text-xs text-red-800">
                                                미이행 시 <span className="font-bold text-danger">{ob.penaltyType} {ob.penaltyAmount}</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 확장 상세 */}
                            {isExpanded && (
                                <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                                    <p className="text-[13px] text-gray-text leading-relaxed mt-3 mb-2">
                                        {ob.description}
                                    </p>

                                    {ob.requiredItems?.length > 0 && (
                                        <div className="mb-2">
                                            <div className="text-xs font-bold text-navy-deep mb-1">필수 기재사항</div>
                                            <ul className="pl-4 space-y-0.5">
                                                {ob.requiredItems.map((item, i) => (
                                                    <li key={i} className="text-xs text-gray-text list-disc">{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-text bg-gray-50 rounded-lg px-3 py-2">
                                        근거: {ob.penaltyBasis}
                                        {ob.applicability?.minEmployees > 1 && (
                                            <span className="ml-2">| 적용: 상시 {ob.applicability.minEmployees}인 이상</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </MobileLayout>
    );
}

export default ChecklistPage;
