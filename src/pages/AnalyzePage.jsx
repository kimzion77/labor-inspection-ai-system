import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { exportToWord, exportToPDF } from '../utils/pdfExport';
import { contractApi } from '../api/contractApi';
import { apiClient } from '../utils/apiClient';
import { PROGRESS_INCREMENT, PROGRESS_MAX } from '../constants';

// Layout Components
import Sidebar from '../components/layout/Sidebar';
import TopHeader from '../components/layout/TopHeader';
import StepProgress from '../components/layout/StepProgress';

// Analysis Steps
import Step1Upload from '../components/analysis/Step1Upload';
import Step2Structure from '../components/analysis/Step2Structure';
import Step3Analysis from '../components/analysis/Step3Analysis';
import Step4Generation from '../components/analysis/Step4Generation';

// Common & Modals
import LoadingOverlay from '../components/common/LoadingOverlay';
import DBModal from '../components/modals/DBModal';

function AnalyzePage() {
    const { service } = useParams();
    const navigate = useNavigate();
    const selectedService = service || 'contract';

    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [extractedText, setExtractedText] = useState('');
    const [structuredData, setStructuredData] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [selectedDB, setSelectedDB] = useState(null);
    const [generatedContract, setGeneratedContract] = useState('');
    const [step, setStep] = useState(1);
    const [userContext, setUserContext] = useState({
        businessSize: '5인이상',
        workerTypes: ['정규직']
    });
    const [isExpanded, setIsExpanded] = useState(false);

    const analysisResultRef = useRef(null);
    const contractRef = useRef(null);

    useEffect(() => {
        apiClient.get('/api/tips/random')
            .then(() => setIsConnected(true))
            .catch(() => setIsConnected(false));
    }, []);

    useEffect(() => {
        console.log('🔍 [State Debug]', {
            step, hasStructuredData: !!structuredData,
            hasAnalysisResult: !!analysisResult, isAnalyzing, filesCount: files.length
        });
    }, [step, structuredData, analysisResult, isAnalyzing, files]);

    const handleAnalysisStart = (svc) => {
        navigate(`/analyze/${svc}`);
        setFiles([]);
        setPreviewUrls([]);
        setExtractedText('');
        setStructuredData(null);
        setAnalysisResult(null);
        setGeneratedContract('');
        setStep(1);
        setIsExpanded(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            if (previewUrls.length > 0) {
                previewUrls.forEach(url => URL.revokeObjectURL(url));
            }
            const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviewUrls(newPreviewUrls);
            setIsExpanded(false);
        }
    };

    const extractOCR = async () => {
        if (!isConnected) { alert('서버와 연결되어 있지 않습니다.'); return; }
        if (files.length === 0) { alert('파일을 먼저 선택해주세요.'); return; }
        setIsAnalyzing(true);
        setProgress(0);
        let combinedText = "";
        const totalFiles = files.length;
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + PROGRESS_INCREMENT, 90));
        }, 500);
        try {
            for (let i = 0; i < totalFiles; i++) {
                const fd = new FormData();
                fd.append('file', files[i]);
                const data = await contractApi.extractOCR(fd);
                if (data.extractedText) {
                    combinedText += `\n--- 문서 ${i + 1} ---\n` + data.extractedText + "\n";
                }
            }
            clearInterval(interval);
            setProgress(95);
            setExtractedText(combinedText.trim());
            await structureDataFn(combinedText.trim());
        } catch (error) {
            clearInterval(interval);
            setIsAnalyzing(false);
            alert('OCR 처리 중 오류가 발생했습니다.\n\n' + error.message);
        }
    };

    const structureDataFn = async (text) => {
        try {
            const data = await contractApi.structureContract(text);
            const parsedData = typeof data.structuredData === 'string'
                ? JSON.parse(data.structuredData) : data.structuredData;
            setProgress(100);
            setStructuredData(parsedData);
            setStep(2);
            setIsAnalyzing(false);
            setProgress(0);
        } catch (error) {
            setIsAnalyzing(false);
            alert('구조화 중 오류가 발생했습니다.\n\n' + error.message);
        }
    };

    const confirmAndAnalyze = async () => {
        if (!structuredData) { alert('구조화된 데이터가 없습니다.'); return; }
        setIsAnalyzing(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 5, 90));
        }, 800);
        try {
            const data = await contractApi.analyzeContract(structuredData, userContext);
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => {
                setAnalysisResult(data);
                setIsAnalyzing(false);
                setStep(3);
                setProgress(0);
                setIsExpanded(false);
            }, 500);
        } catch (error) {
            clearInterval(interval);
            setIsAnalyzing(false);
            alert('분석 중 오류가 발생했습니다.\n\n' + error.message);
        }
    };

    const generateContract = async () => {
        if (!analysisResult) return;
        setIsAnalyzing(true);
        try {
            const data = await contractApi.generateContract(analysisResult);
            if (data.success) {
                setGeneratedContract(data.contractText);
                setStep(4);
            } else {
                alert('계약서 생성 실패: ' + data.error);
            }
        } catch (error) {
            alert('계약서 생성 중 오류가 발생했습니다.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const downloadContractPDF = async () => {
        if (!generatedContract) return;
        try {
            await exportToPDF(generatedContract, `표준근로계약서_${new Date().toISOString().slice(0, 10)}.pdf`);
        } catch (error) { alert(error.message); }
    };

    const downloadContractWord = () => {
        if (!generatedContract) return;
        exportToWord(generatedContract, `표준근로계약서_${new Date().toISOString().slice(0, 10)}.doc`);
    };

    const downloadAnalysisPDF = async () => {
        if (!analysisResultRef.current) return;
        try {
            const buttons = analysisResultRef.current.querySelectorAll('button');
            buttons.forEach(btn => btn.style.display = 'none');
            const canvas = await html2canvas(analysisResultRef.current, {
                scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff'
            });
            buttons.forEach(btn => btn.style.display = '');
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`근로계약서_분석결과_${new Date().toISOString().slice(0, 10)}.pdf`);
        } catch (error) {
            alert('PDF 생성 중 오류가 발생했습니다.');
        }
    };

    const handleReUpload = () => {
        setStructuredData(null);
        setFiles([]);
        setPreviewUrls([]);
        setStep(1);
    };

    return (
        <div className="app-container">
            <Sidebar selectedService={selectedService} onSelectService={handleAnalysisStart} />
            <div className="main-content">
                <TopHeader selectedService={selectedService} isConnected={isConnected} />
                <StepProgress step={step} files={files} analysisResult={analysisResult} />
                <div className="content-area">
                    <div>
                        {step === 4 ? (
                            <Step4Generation
                                previewUrls={previewUrls}
                                extractedText={extractedText}
                                generatedContract={generatedContract}
                                onContractChange={setGeneratedContract}
                                onDownloadWord={downloadContractWord}
                                onDownloadPDF={downloadContractPDF}
                                contractRef={contractRef}
                            />
                        ) : files.length === 0 ? (
                            <Step1Upload onFileChange={handleFileChange} />
                        ) : (
                            <div className="split-view">
                                <div className="document-panel">
                                    <div className="panel-header">
                                        <div className="panel-title">업로드된 문서</div>
                                    </div>
                                    {previewUrls.map((url, idx) => (
                                        <img key={idx} src={url} alt={`문서 ${idx + 1}`} className="document-image" />
                                    ))}
                                    {!analysisResult && (
                                        <button onClick={extractOCR} className="upload-button" style={{ marginTop: '16px', width: '100%' }}>
                                            분석 시작
                                        </button>
                                    )}
                                </div>
                                <div className={`analysis-panel ${(step === 3 && !isExpanded) ? 'scroll-hidden' : 'scroll-visible'}`} style={{
                                    position: 'relative', height: '100%', transition: 'max-height 0.3s ease-in-out'
                                }}>
                                    <div className="panel-header">
                                        <div className="panel-title">분석 결과</div>
                                    </div>
                                    {structuredData && !analysisResult && (
                                        <Step2Structure
                                            structuredData={structuredData}
                                            setStructuredData={setStructuredData}
                                            userContext={userContext}
                                            setUserContext={setUserContext}
                                            onConfirm={confirmAndAnalyze}
                                            onReUpload={handleReUpload}
                                        />
                                    )}
                                    {analysisResult && (
                                        <div style={{ paddingBottom: isExpanded ? '0' : '60px' }}>
                                            <Step3Analysis
                                                analysisResult={analysisResult}
                                                userContext={userContext}
                                                onDownloadPDF={downloadAnalysisPDF}
                                                onGenerateContract={generateContract}
                                                onSelectDB={setSelectedDB}
                                                resultRef={analysisResultRef}
                                            />
                                        </div>
                                    )}
                                    {isAnalyzing && !structuredData && !analysisResult && (
                                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>
                                            <div className="loading-spinner"></div>
                                            <div style={{ marginTop: '16px' }}>분석 대기 중...</div>
                                        </div>
                                    )}
                                    {isAnalyzing && structuredData && (
                                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>
                                            <div className="loading-spinner"></div>
                                            <div style={{ marginTop: '16px' }}>
                                                <div style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>AI가 법률을 검토하고 있습니다...</div>
                                                <div style={{ fontSize: '14px', marginTop: '8px' }}>약 30초 정도 소요됩니다 잠시만 기다려주세요</div>
                                            </div>
                                        </div>
                                    )}
                                    {!structuredData && !analysisResult && !isAnalyzing && (
                                        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-secondary)' }}>
                                            분석 시작 버튼을 클릭하세요
                                        </div>
                                    )}
                                    {analysisResult && !isExpanded && (
                                        <div style={{
                                            position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px',
                                            background: 'linear-gradient(to bottom, rgba(255,255,255,0), white 70%)',
                                            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                                            paddingBottom: '20px', zIndex: 10
                                        }}>
                                            <button onClick={() => setIsExpanded(true)} style={{
                                                padding: '10px 24px', background: 'white', border: '1px solid #d9d9d9',
                                                borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                color: '#0056B3', fontWeight: 600, cursor: 'pointer', fontSize: '14px',
                                                display: 'flex', alignItems: 'center', gap: '6px'
                                            }}>
                                                더보기 ⬇️
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <LoadingOverlay isAnalyzing={isAnalyzing} progress={progress} />
                <DBModal selectedDB={selectedDB} onClose={() => setSelectedDB(null)} />
            </div>
        </div>
    );
}

export default AnalyzePage;
