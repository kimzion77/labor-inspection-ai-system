import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import DoneMobileLayout from '../components/DoneMobileLayout';
import violationCasesData from '../data/laborLaw/violationCases.json';
import faqData from '../data/laborLaw/faqData.json';
import '../done-styles.css';

const CATEGORIES = ['전체', '근로계약', '임금', '근로시간', '휴가', '퇴직', '서류', '보험', '교육', '안전'];

function CasesAndFAQ() {
    const [activeTab, setActiveTab] = useState('cases');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [expandedFaqId, setExpandedFaqId] = useState(null);

    // 카테고리 필터링
    const filteredCases = selectedCategory === '전체'
        ? violationCasesData
        : violationCasesData.filter(c => c.category === selectedCategory);

    const filteredFaq = selectedCategory === '전체'
        ? faqData
        : faqData.filter(f => f.category === selectedCategory);

    const toggleFaq = (id) => {
        setExpandedFaqId(prev => prev === id ? null : id);
    };

    return (
        <DoneMobileLayout title="위반사례 & FAQ">
            {/* 탭 전환 */}
            <div className="tab-switcher">
                <button
                    className={`tab-switch-btn ${activeTab === 'cases' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cases')}
                >
                    실제 감독 지적사항
                </button>
                <button
                    className={`tab-switch-btn ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faq')}
                >
                    자주 묻는 질문
                </button>
            </div>

            {/* 카테고리 필터 */}
            <div className="category-filter">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`category-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 위반사례 탭 */}
            {activeTab === 'cases' && (
                <div>
                    {filteredCases.map(caseItem => (
                        <div key={caseItem.id} className="case-card">
                            <div className="case-card-header">
                                <div className="case-card-title">{caseItem.title}</div>
                                <div className="case-card-penalty">{caseItem.penalty}</div>
                            </div>

                            <div className="case-section">
                                <div className="case-section-label">{caseItem.violation}</div>
                            </div>

                            <div className="case-section">
                                <div className="case-section-label">위반 상황</div>
                                <div className="case-section-text">{caseItem.situation}</div>
                            </div>

                            <div className="case-prevention">
                                <div className="case-prevention-label">예방 조치</div>
                                <div className="case-prevention-text">{caseItem.prevention}</div>
                            </div>
                        </div>
                    ))}

                    {filteredCases.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
                            해당 카테고리의 위반사례가 없습니다.
                        </div>
                    )}
                </div>
            )}

            {/* FAQ 탭 */}
            {activeTab === 'faq' && (
                <div>
                    {filteredFaq.map(faq => {
                        const isExpanded = expandedFaqId === faq.id;
                        return (
                            <div key={faq.id} className="faq-item">
                                <button className="faq-question" onClick={() => toggleFaq(faq.id)}>
                                    <span className="faq-q-mark">Q</span>
                                    <span className="faq-q-text">{faq.question}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`faq-toggle ${isExpanded ? 'open' : ''}`}
                                    />
                                </button>
                                {isExpanded && (
                                    <div className="faq-answer">
                                        {faq.answer}
                                        {faq.legalBasis && (
                                            <div className="faq-answer-legal">
                                                📖 {faq.legalBasis}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {filteredFaq.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF' }}>
                            해당 카테고리의 FAQ가 없습니다.
                        </div>
                    )}
                </div>
            )}
        </DoneMobileLayout>
    );
}

export default CasesAndFAQ;
