import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check, AlertTriangle, Search, UserPlus, FileSignature, Banknote, Clock, LogOut, ChevronRight, X, ExternalLink } from 'lucide-react';
import DoneMobileLayout from '../components/DoneMobileLayout';
import '../done-styles.css';
import obligationsData from '../data/laborLaw/obligationsAdvanced.json';
import situationsData from '../data/laborLaw/situations.json';

const SIZES = [
    { label: '전체', value: 0 },
    { label: '5인 미만', value: 4 },
    { label: '5인 이상', value: 5 },
    { label: '10인 이상', value: 10 },
    { label: '30인 이상', value: 30 },
    { label: '50인 이상', value: 50 },
];

const CATEGORIES = ['전체', '근로계약', '임금', '근로시간', '휴가', '퇴직', '안전', '교육', '보험', '서류', '채용'];

const STORAGE_KEY = 'labor-guide-checked-advanced';

const iconMap = {
    UserPlus, FileSignature, Banknote, Clock, LogOut
};

function ChecklistAdvancedPage() {
    const location = useLocation();
    const [mainTab, setMainTab] = useState(location.state?.activeTab || 'checklist'); // 'checklist' or 'situations'
    const [selectedSize, setSelectedSize] = useState(() => {
        const saved = localStorage.getItem('selectedBusinessSize');
        return saved ? parseInt(saved) : 0;
    });
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [checkedItems, setCheckedItems] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch { return {}; }
    });
    const [expandedId, setExpandedId] = useState(null);

    // 상황별 탭 상태
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSituationId, setSelectedSituationId] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    }, [checkedItems]);

    // 체크리스트 필터링 로직
    const filteredBySize = useMemo(() => {
        if (selectedSize === 0) return obligationsData;
        return obligationsData.filter(ob => {
            const min = ob.applicability?.minEmployees || 1;
            return min <= selectedSize;
        });
    }, [selectedSize]);

    const filteredObligations = useMemo(() => {
        if (selectedCategory === '전체') return filteredBySize;
        return filteredBySize.filter(ob => ob.category === selectedCategory);
    }, [filteredBySize, selectedCategory]);

    // 통계 계산
    const totalCount = filteredBySize.length;
    const checkedCount = filteredBySize.filter(ob => checkedItems[ob.id]).length;
    const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    // 상황별 필터링
    const filteredSituations = useMemo(() => {
        return situationsData.filter(situation =>
            situation.title.includes(searchTerm) ||
            situation.description.includes(searchTerm)
        );
    }, [searchTerm]);

    const selectedSituation = useMemo(() => {
        return situationsData.find(s => s.id === selectedSituationId);
    }, [selectedSituationId]);

    const getSizeLabel = () => {
        const size = SIZES.find(s => s.value === selectedSize);
        return size ? `${size.label} 사업장` : '사업장';
    };

    return (
        <DoneMobileLayout title={mainTab === 'checklist' ? getSizeLabel() : '상황별 빠른 안내'}>

            {/* 메인 탭 전환 */}
            <div className="tab-switcher">
                <button
                    className={`tab-switch-btn ${mainTab === 'checklist' ? 'active' : ''}`}
                    onClick={() => setMainTab('checklist')}
                >
                    의무 체크리스트
                </button>
                <button
                    className={`tab-switch-btn ${mainTab === 'situations' ? 'active' : ''}`}
                    onClick={() => setMainTab('situations')}
                >
                    상황별 가이드
                </button>
            </div>

            {/* 체크리스트 탭 내용 */}
            {mainTab === 'checklist' && (
                <>
                    {/* 사업장 규모 선택 */}
                    <div className="business-size-selector">
                        {SIZES.map(s => (
                            <button
                                key={s.value}
                                className={`size-chip ${selectedSize === s.value ? 'active' : ''}`}
                                onClick={() => setSelectedSize(s.value)}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* 진행률 요약 */}
                    <div className="summary-card">
                        <div className="progress-section">
                            <div className="progress-header">
                                <span className="progress-label">이행률</span>
                                <span className="progress-value">{progressPercent}% ({checkedCount}/{totalCount})</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        {totalCount - checkedCount > 0 && (
                            <div style={{
                                marginTop: '12px', padding: '10px 12px',
                                background: '#FEF2F2', borderRadius: '8px',
                                fontSize: '13px', color: '#991B1B',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                <AlertTriangle size={16} />
                                미이행 항목 {totalCount - checkedCount}건에 대한 과태료·벌금 리스크가 있습니다
                            </div>
                        )}
                    </div>

                    {/* 카테고리 필터 */}
                    <div className="category-filter">
                        {CATEGORIES.filter(cat =>
                            cat === '전체' || filteredBySize.some(ob => ob.category === cat)
                        ).map(cat => (
                            <button
                                key={cat}
                                className={`category-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* 의무사항 목록 */}
                    {filteredObligations.map(ob => {
                        const isChecked = !!checkedItems[ob.id];
                        const isExpanded = expandedId === ob.id;
                        return (
                            <div key={ob.id} className={`obligation-card ${isChecked ? 'checked' : 'unchecked'}`}>
                                <div className="obligation-card-header">
                                    <div
                                        className={`obligation-checkbox ${isChecked ? 'checked' : ''}`}
                                        onClick={() => toggleCheck(ob.id)}
                                    >
                                        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
                                    </div>
                                    <div className="obligation-info" onClick={() => toggleExpand(ob.id)} style={{ cursor: 'pointer' }}>
                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 mb-1 border border-gray-200">
                                            {ob.category}
                                        </span>
                                        <div className="obligation-title">
                                            {ob.title}
                                            <span className={`status-badge ${isChecked ? 'complete' : 'incomplete'}`}>
                                                {isChecked ? '완료' : '미이행'}
                                            </span>
                                        </div>
                                        <div className="obligation-legal">{ob.legalBasis}</div>
                                    </div>
                                    <button className="obligation-expand-btn" onClick={() => toggleExpand(ob.id)}>
                                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                </div>

                                {isExpanded && (
                                    <div className="obligation-detail">
                                        <div className="obligation-description">{ob.description}</div>

                                        {ob.requiredItems && ob.requiredItems.length > 0 && (
                                            <div style={{ marginBottom: '10px' }}>
                                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                                                    필수 기재/이행 사항:
                                                </div>
                                                <ul style={{ paddingLeft: '16px', margin: 0 }}>
                                                    {ob.requiredItems.map((item, i) => (
                                                        <li key={i} style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6 }}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {!isChecked && (
                                            <div className="penalty-warning">
                                                <AlertTriangle size={16} className="penalty-warning-icon" />
                                                <div className="penalty-warning-text">
                                                    <strong>위반 시:</strong> {ob.penaltyType} - <span className="penalty-amount">{ob.penaltyAmount}</span>
                                                    <br />
                                                    <span style={{ fontSize: '11px', color: '#9B2C2C' }}>({ob.penaltyBasis})</span>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}

                                {ob.refLink && null}
                            </div>
                        );
                    })}

                    {filteredObligations.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
                            해당 조건에 맞는 의무사항이 없습니다.
                        </div>
                    )}
                </>
            )}

            {/* 상황별 안내 탭 내용 */}
            {mainTab === 'situations' && !selectedSituationId && (
                <>
                    <div className="search-box">
                        <Search size={18} color="#9CA3AF" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="검색 (Search)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <p style={{
                        fontSize: '14px', color: '#6B7280', marginBottom: '16px', lineHeight: 1.5
                    }}>
                        사업 운영 중 자주 발생하는 상황별로<br />반드시 지켜야 할 법적 의무를 안내합니다.
                    </p>

                    <div className="situation-list">
                        {filteredSituations.map(situation => {
                            const Icon = iconMap[situation.icon] || FileSignature;
                            return (
                                <div
                                    key={situation.id}
                                    className="situation-card"
                                    onClick={() => setSelectedSituationId(situation.id)}
                                >
                                    <div className="situation-icon" style={{ background: `${situation.color}15` }}>
                                        <Icon size={24} color={situation.color} />
                                    </div>
                                    <div className="situation-card-info">
                                        <div className="situation-card-title">{situation.title}</div>
                                        <div className="situation-card-desc">{situation.description}</div>
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                                            {situation.steps.length}단계 가이드
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="situation-card-arrow" />
                                </div>
                            );
                        })}
                    </div>

                    {filteredSituations.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
                            검색 결과가 없습니다.
                        </div>
                    )}
                </>
            )}

            {/* 상황별 상세 뷰 (Overlay 형태) */}
            {mainTab === 'situations' && selectedSituationId && selectedSituation && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col">
                    {/* 상세 헤더 */}
                    <div className="labor-guide-header">
                        <div className="labor-guide-header-left">
                            <button className="labor-guide-header-back" onClick={() => setSelectedSituationId(null)}>
                                <ChevronDown size={28} className="rotate-90" />
                            </button>
                            <span className="labor-guide-header-title">{selectedSituation.title} 가이드</span>
                        </div>
                    </div>

                    {/* 상세 내용 스크롤 영역 */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 pb-24">
                        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm text-center">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${selectedSituation.color}15` }}>
                                {(() => {
                                    const Icon = iconMap[selectedSituation.icon] || FileSignature;
                                    return <Icon size={32} color={selectedSituation.color} />;
                                })()}
                            </div>
                            <h2 className="text-xl font-bold text-navy-deep mb-1">{selectedSituation.title}</h2>
                            <p className="text-sm text-gray-secondary">{selectedSituation.description}</p>
                        </div>

                        <div className="step-guide-list">
                            {selectedSituation.steps.map((step, index) => (
                                <div key={index} className="step-guide-card relative pl-12">
                                    {/* 연결선 */}
                                    {index < selectedSituation.steps.length - 1 && (
                                        <div className="absolute left-[26px] top-10 bottom-[-20px] w-[2px] bg-gray-200"></div>
                                    )}

                                    {/* 스텝 번호 */}
                                    <div className="absolute left-3 top-4 w-7 h-7 rounded-full bg-blue-primary text-white flex items-center justify-center text-sm font-bold z-10">
                                        {index + 1}
                                    </div>

                                    <div>
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-[15px] font-bold text-navy-deep">{step.title}</h3>
                                        </div>

                                        <div className="legal-ref-chip mb-2">
                                            📜 {step.legalBasis || step.legalRef}
                                        </div>

                                        <p className="text-[13px] text-gray-text leading-relaxed mb-3">
                                            {step.description}
                                        </p>

                                        {step.tips && step.tips.length > 0 && (
                                            <div className="step-tips">
                                                <div className="step-tips-title">💡 Check Point</div>
                                                <ul className="step-tips-list">
                                                    {step.tips.map((tip, i) => (
                                                        <li key={i}>{tip}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </DoneMobileLayout>
    );
}

export default ChecklistAdvancedPage;
