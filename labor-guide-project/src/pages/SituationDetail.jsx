import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MobileLayout from '../components/laborGuide/layout/MobileLayout';
import situationsData from '../data/laborLaw/situations.json';

function SituationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expandedStep, setExpandedStep] = useState(0);

    const situation = situationsData.find(s => s.id === id);

    if (!situation) {
        return (
            <MobileLayout title="상황별 안내">
                <div className="text-center py-12 text-gray-text text-sm">
                    해당 상황을 찾을 수 없습니다.
                    <br />
                    <button onClick={() => navigate('/labor-guide/situations')} className="mt-4 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold">
                        목록으로 돌아가기
                    </button>
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout title={situation.title}>
            {/* 상황 설명 */}
            <div className="rounded-xl p-4 mb-5 border-l-4" style={{ borderColor: situation.color, backgroundColor: `${situation.color}08` }}>
                <p className="text-sm text-gray-700 leading-relaxed">{situation.description}</p>
                <p className="text-xs text-gray-text mt-2">총 {situation.steps.length}단계 절차</p>
            </div>

            {/* 스텝 가이드 */}
            <div className="space-y-3">
                {situation.steps.map((step, idx) => {
                    const isOpen = expandedStep === idx;
                    return (
                        <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <button
                                onClick={() => setExpandedStep(prev => prev === idx ? null : idx)}
                                className="w-full flex items-center gap-3 p-4 text-left"
                            >
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: situation.color }}>
                                    {step.step}
                                </div>
                                <span className="flex-1 text-[15px] font-bold text-navy-deep">{step.title}</span>
                                {isOpen ? <ChevronUp size={18} className="text-gray-text" /> : <ChevronDown size={18} className="text-gray-text" />}
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4 pl-[60px]">
                                    {step.legalBasis && (
                                        <span className="inline-block px-2.5 py-1 bg-blue-50 text-primary rounded-md text-xs font-semibold mb-2">
                                            {step.legalBasis}
                                        </span>
                                    )}
                                    <p className="text-[13px] text-gray-text leading-relaxed mb-3">{step.description}</p>
                                    {step.tips?.length > 0 && (
                                        <div className="bg-green-50 rounded-lg px-3 py-2.5">
                                            <div className="text-xs font-bold text-green-700 mb-1">TIP</div>
                                            <ul className="space-y-1">
                                                {step.tips.map((tip, i) => (
                                                    <li key={i} className="text-xs text-green-800 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-green-500">
                                                        {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </MobileLayout>
    );
}

export default SituationDetail;
