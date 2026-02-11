import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_DIR = path.resolve(__dirname, '../../done/excel');
const OUTPUT_DIR = path.resolve(__dirname, '../src/data/laborLaw/topics');

// 파일명 → 영문 키 매핑
const TOPIC_MAP = {
    '가산수당': { key: 'overtimeAllowance', label: '가산수당' },
    '간주근로제': { key: 'deemedWorkSystem', label: '간주근로제' },
    '감시단속적근로': { key: 'surveillanceWork', label: '감시단속적근로' },
    '계속근로기간': { key: 'continuousService', label: '계속근로기간' },
    '교대제': { key: 'shiftWork', label: '교대제' },
    '근로시간': { key: 'workingHours', label: '근로시간' },
    '근로자성': { key: 'workerStatus', label: '근로자성' },
    '대지급금': { key: 'wageGuarantee', label: '대지급금' },
    '법정외수당': { key: 'nonStatutoryAllowance', label: '법정외수당' },
    '보상휴가': { key: 'compensatoryLeave', label: '보상휴가' },
    '상시근로자수': { key: 'regularEmployeeCount', label: '상시근로자수' },
    '선택근로제': { key: 'selectiveWorkSystem', label: '선택근로제' },
    '실업급여': { key: 'unemploymentBenefits', label: '실업급여' },
    '연차수당': { key: 'annualLeaveAllowance', label: '연차수당' },
    '연차유급휴가': { key: 'annualPaidLeave', label: '연차유급휴가' },
    '연차촉진': { key: 'annualLeavePromotion', label: '연차촉진' },
    '일용직': { key: 'dailyWorker', label: '일용직' },
    '임금': { key: 'wages', label: '임금' },
    '임금대장-임금명세서': { key: 'wageLedger', label: '임금대장/임금명세서' },
    '임금체불': { key: 'wageArrears', label: '임금체불' },
    '재량근로제': { key: 'discretionaryWorkSystem', label: '재량근로제' },
    '주휴수당': { key: 'weeklyHolidayAllowance', label: '주휴수당' },
    '최저임금': { key: 'minimumWage', label: '최저임금' },
    '탄력근로제': { key: 'flexibleWorkSystem', label: '탄력근로제' },
    '통상임금': { key: 'ordinaryWage', label: '통상임금' },
    '퇴직금': { key: 'severancePay', label: '퇴직금' },
    '평균임금': { key: 'averageWage', label: '평균임금' },
    '포괄임금제': { key: 'comprehensiveWageSystem', label: '포괄임금제' },
    '해고예고수당': { key: 'dismissalNoticeAllowance', label: '해고예고수당' },
    '휴업수당': { key: 'shutdownAllowance', label: '휴업수당' },
    '휴일-휴일대체': { key: 'holidayAndSubstitute', label: '휴일/휴일대체' },
};

// 카테고리 분류
const CATEGORY_MAP = {
    '근로계약': ['workerStatus', 'continuousService', 'regularEmployeeCount', 'dailyWorker'],
    '임금': ['wages', 'minimumWage', 'ordinaryWage', 'averageWage', 'comprehensiveWageSystem', 'wageLedger', 'wageArrears', 'wageGuarantee'],
    '수당': ['overtimeAllowance', 'weeklyHolidayAllowance', 'annualLeaveAllowance', 'nonStatutoryAllowance', 'dismissalNoticeAllowance', 'shutdownAllowance'],
    '근로시간': ['workingHours', 'flexibleWorkSystem', 'selectiveWorkSystem', 'deemedWorkSystem', 'discretionaryWorkSystem', 'shiftWork', 'surveillanceWork'],
    '휴가/휴일': ['annualPaidLeave', 'annualLeavePromotion', 'compensatoryLeave', 'holidayAndSubstitute'],
    '퇴직': ['severancePay'],
    '고용보험': ['unemploymentBenefits'],
};

function getTopicKey(filename) {
    for (const [korName, info] of Object.entries(TOPIC_MAP)) {
        if (filename.startsWith(korName)) return info;
    }
    return null;
}

function parseExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

    if (rows.length < 2) return [];

    // 첫 행은 헤더: 유형, 내용, 법조문, 판례, 질의회시, 매뉴얼
    const entries = [];
    let currentSection = '';
    let currentSubSection = '';

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const category = (row[0] || '').toString().trim();
        const content = (row[1] || '').toString().trim();
        const legalRef = (row[2] || '').toString().trim();
        const caseRef = (row[3] || '').toString().trim();
        const qaRef = (row[4] || '').toString().trim();
        const manualRef = (row[5] || '').toString().trim();
        const meta = (row[6] || '').toString().trim();

        if (!content || content.startsWith('# DB_')) continue;
        if (meta === '*삭제') continue;

        // 섹션 헤더 감지 (1., 2., etc.)
        const sectionMatch = content.match(/^(\d+)\.\s*(.+)/);
        const subSectionMatch = content.match(/^(\d+)\.(\d+)\.?\s*(.+)/);

        let type = 'content';
        if (subSectionMatch) {
            type = 'subsection';
            currentSubSection = content;
        } else if (sectionMatch) {
            type = 'section';
            currentSection = content;
            currentSubSection = '';
        }

        entries.push({
            type,
            content,
            legalRef: legalRef || undefined,
            caseRef: caseRef || undefined,
            qaRef: qaRef || undefined,
            manualRef: manualRef || undefined,
            section: currentSection,
            subSection: currentSubSection || undefined
        });
    }

    return entries;
}

function main() {
    // 출력 디렉토리 생성
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const files = fs.readdirSync(EXCEL_DIR).filter(f => f.endsWith('.xlsx'));
    const topicIndex = {};

    console.log(`📂 ${files.length}개 Excel 파일 변환 시작...\n`);

    for (const file of files) {
        const filePath = path.join(EXCEL_DIR, file);
        const topicInfo = getTopicKey(file);

        if (!topicInfo) {
            console.log(`⚠️  매핑 없음: ${file}`);
            continue;
        }

        const entries = parseExcelFile(filePath);
        const outputFile = path.join(OUTPUT_DIR, `${topicInfo.key}.json`);

        const topicData = {
            key: topicInfo.key,
            label: topicInfo.label,
            sourceFile: file,
            totalEntries: entries.length,
            entries
        };

        fs.writeFileSync(outputFile, JSON.stringify(topicData, null, 2), 'utf-8');
        topicIndex[topicInfo.key] = topicInfo.label;
        console.log(`✅ ${topicInfo.label} (${topicInfo.key}) → ${entries.length}개 항목`);
    }

    // 카테고리 파일 생성
    const categoriesData = Object.entries(CATEGORY_MAP).map(([name, topics]) => ({
        name,
        topics: topics.map(key => ({ key, label: topicIndex[key] || key }))
    }));

    const categoriesPath = path.resolve(OUTPUT_DIR, '../categories.json');
    fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2), 'utf-8');
    console.log(`\n📋 categories.json 생성 완료`);

    // 인덱스 파일 생성
    const indexPath = path.resolve(OUTPUT_DIR, '../topicIndex.json');
    fs.writeFileSync(indexPath, JSON.stringify(topicIndex, null, 2), 'utf-8');
    console.log(`📋 topicIndex.json 생성 완료`);

    console.log(`\n🎉 변환 완료! ${Object.keys(topicIndex).length}개 주제 처리됨`);
}

main();
