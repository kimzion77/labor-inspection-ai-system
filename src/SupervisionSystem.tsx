import React, { useState } from 'react';
import { Search, FileText, Building2, TrendingUp, Users, Calendar, MapPin, User, BarChart3, AlertTriangle, Shield, Target, Printer, Download, FileDown, Scale, PiggyBank } from 'lucide-react';

const SupervisionSystem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const [supervisionType, setSupervisionType] = useState('industrial');
  const [showAllSites, setShowAllSites] = useState(false);
  const [showAccidentDetails, setShowAccidentDetails] = useState(false);
  const [showSafetyManager, setShowSafetyManager] = useState(false);
  const [showSupervisionHistory, setShowSupervisionHistory] = useState(false);
  const [showJudicialHistory, setShowJudicialHistory] = useState(false);
  const [showFineHistory, setShowFineHistory] = useState(false);
  const [showSubContractors, setShowSubContractors] = useState(false);
  const [showCurrentSite, setShowCurrentSite] = useState(false);
  const [showSafetyManagerHistory, setShowSafetyManagerHistory] = useState(false);

  // 테스트용 사업장 데이터
  const [businesses] = useState([
    {
      id: 1,
      name: '(주)대한제조',
      registrationNumber: '123-45-67890',
      ownerName: '김대한',
      ownerContact: '010-1234-5678',
      contact: '02-1234-5678',
      jurisdiction: '안산지방고용노동청',
      industry: '플라스틱제품 제조업',
      industryCategory: 'manufacturing',
      location: '경기도 안산시 단원구 공단로 123',
      branchType: '본사',
      employees: 85,
      revenue: 12000000000,
      foundedYear: 2015,
      description: '자동차 부품용 플라스틱제품 제조업체',
      allSites: [
        {
          siteName: '자동차부품 제조라인 A동',
          address: '경기도 안산시 단원구 공단로 123',
          client: '현대자동차그룹',
          projectType: '플라스틱제품제조',
          progress: 85,
          currentProcess: '최종 품질검사 단계',
          contractAmount: 25000000000,
          status: '진행중',
          startDate: '2024.01.01',
          endDate: '2024.12.31',
          isCurrent: true
        },
        {
          siteName: '자동차부품 제조라인 B동',
          address: '경기도 안산시 단원구 공단로 125',
          client: '기아자동차',
          projectType: '플라스틱제품제조',
          progress: 45,
          currentProcess: '중간 조립 단계',
          contractAmount: 18000000000,
          status: '진행중',
          startDate: '2024.06.01',
          endDate: '2025.05.31',
          isCurrent: false
        },
        {
          siteName: '전기차부품 개발라인',
          address: '경기도 안산시 단원구 공단로 127',
          client: '테슬라코리아',
          projectType: '전기차부품제조',
          progress: 20,
          currentProcess: '초기 설계 단계',
          contractAmount: 35000000000,
          status: '진행중',
          startDate: '2024.09.01',
          endDate: '2025.12.31',
          isCurrent: false
        }
      ],
      projectInfo: {
        client: '현대자동차그룹',
        mainContractor: '123-45-67890',
        subContractors: [
          {
            field: '철근콘크리트',
            company: '(주)하이건설',
            registrationNumber: '234-56-78901',
            representative: '이철근'
          },
          {
            field: '토목공사',
            company: '(주)대한토목',
            registrationNumber: '345-67-89012',
            representative: '박토목'
          },
          {
            field: '전기설비',
            company: '(주)전기산업',
            registrationNumber: '456-78-90123',
            representative: '최전기'
          }
        ],
        siteName: '자동차부품 제조라인 A동',
        projectType: '플라스틱제품제조',
        progress: 85,
        currentProcess: '최종 품질검사 단계',
        contractPeriod: '2024.01.01 ~ 2024.12.31',
        contractAmount: 25000000000,
        safetyManager: {
          name: '박안전',
          contact: '010-3456-7890',
          email: 'safety@daehan.com',
          license: '산업안전기사',
          appointmentDate: '2024.01.15',
          dismissalDate: '',
          concurrentType: '전담'
        },
        judicialHistory: [
          {
            year: 2023,
            caseType: '중대재해처벌법 위반',
            caseNumber: '수원지법 2023고단1234',
            prosecutionStatus: '기소',
            violationDetail: '안전보건관리체계 구축 및 이행 의무 위반',
            courtResult: '벌금 5천만원',
            status: '확정',
            reason: '프레스기 안전장치 미설치로 인한 근로자 중상해 사고 발생'
          },
          {
            year: 2022,
            caseType: '산업안전보건법 위반',
            caseNumber: '안산지청 2022형3456',
            prosecutionStatus: '기소유예',
            violationDetail: '안전교육 미실시 및 안전장치 미설치',
            courtResult: '기소유예',
            status: '종결',
            reason: '신규채용자 안전교육 미실시 및 방호장치 설치 지연'
          }
        ],
        safetyManagerHistory: [
          { year: 2024, status: '선임', name: '박안전', license: '산업안전기사', appointmentDate: '2024.01.15', dismissalDate: '', reason: '신규선임', education: '40시간 완료' },
          { year: 2023, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '2023.12.31', reason: '전임자 퇴사 후 미선임', education: '' },
          { year: 2022, status: '선임', name: '김안전', license: '산업안전기사', appointmentDate: '2022.01.15', dismissalDate: '2023.12.31', reason: '정상근무', education: '40시간 완료' },
          { year: 2021, status: '선임', name: '김안전', license: '산업안전기사', appointmentDate: '2021.05.10', dismissalDate: '2022.01.14', reason: '정상근무', education: '40시간 완료' },
          { year: 2020, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '코로나19로 인한 채용 지연', education: '' }
        ],
        accidentHistory: [
          { year: 2020, accidents: 3, deaths: 0, injuries: 4 },
          { year: 2021, accidents: 1, deaths: 0, injuries: 1 },
          { year: 2022, accidents: 0, deaths: 0, injuries: 0 },
          { year: 2023, accidents: 2, deaths: 0, injuries: 2 },
          { year: 2024, accidents: 1, deaths: 0, injuries: 1 }
        ],
        supervisionHistory: [
          { year: 2023, selected: 'Y', reason: '산재발생', result: '경고', jurisdiction: '안산지방고용노동청', details: '기계안전장치 미설치로 인한 재해발생 경고조치' },
          { year: 2022, selected: 'N', reason: '', result: '', jurisdiction: '', details: '' },
          { year: 2021, selected: 'Y', reason: '정기점검', result: '양호', jurisdiction: '안산지방고용노동청', details: '정기 안전점검 결과 양호, 특이사항 없음' },
          { year: 2020, selected: 'Y', reason: '산재발생', result: '개선명령', jurisdiction: '안산지방고용노동청', details: '작업환경 개선 및 안전교육 강화 명령' },
          { year: 2019, selected: 'Y', reason: '산재발생', result: '작업중지명령', jurisdiction: '안산지방고용노동청', details: '중대재해 발생으로 작업중지 및 안전조치 완료 후 재개' }
        ],
        fineHistory: [
          { year: 2024, violationType: '안전보건관리자 미선임', violationDetail: '산업안전기사 자격을 가진 안전보건관리자 미선임', fineAmount: 5000000, paymentStatus: '납부완료', paymentDate: '2024.04.15', violationLaw: '산업안전보건법 제17조', reason: '2023년 12월부터 2024년 1월까지 안전관리자 공백 기간 발생' },
          { year: 2023, violationType: '안전교육 미실시', violationDetail: '신규채용자 안전보건교육 미실시', fineAmount: 3000000, paymentStatus: '납부완료', paymentDate: '2023.08.20', violationLaw: '산업안전보건법 제31조', reason: '신규 입사자 10명에 대한 법정 안전교육 미실시' },
          { year: 2022, violationType: '작업환경측정 미실시', violationDetail: '소음작업장 작업환경측정 미실시', fineAmount: 2000000, paymentStatus: '분할납부중', paymentDate: '2023.12.01', violationLaw: '산업안전보건법 제125조', reason: '제조라인 소음측정 6개월 연체' },
          { year: 2021, violationType: '안전장치 미설치', violationDetail: '프레스기 안전장치 미설치', fineAmount: 8000000, paymentStatus: '미납', paymentDate: '', violationLaw: '산업안전보건법 제89조', reason: '프레스기 3대 광전자식 안전장치 미설치로 협착사고 위험' }
        ],
        accidentDetails: [
          { year: 2024, name: '김**', nationality: '한국', hireDate: '2023.06.15', workType: '일용직', injuryType: '골절', injuryLocation: '오른쪽 다리', expectedLeave: 45, death: false, workCategory: '기계작업', cause: '프레스기 안전장치 불량으로 인한 협착' },
          { year: 2023, name: '이**', nationality: '한국', hireDate: '2022.03.10', workType: '상용직', injuryType: '타박상', injuryLocation: '허리', expectedLeave: 14, death: false, workCategory: '중장비작업', cause: '안전벨트 미착용 상태 중장비 추락' },
          { year: 2023, name: '박**', nationality: '베트남', hireDate: '2023.01.05', workType: '일용직', injuryType: '열상', injuryLocation: '왼손', expectedLeave: 21, death: false, workCategory: '화학물질취급', cause: '보호장갑 미착용으로 인한 화상' },
          { year: 2021, name: '최**', nationality: '한국', hireDate: '2020.11.20', workType: '상용직', injuryType: '찰과상', injuryLocation: '등', expectedLeave: 7, death: false, workCategory: '운반작업', cause: '적재물 낙하로 인한 충돌' },
          { year: 2020, name: '정**', nationality: '필리핀', hireDate: '2019.08.15', workType: '계약직', injuryType: '염좌', injuryLocation: '발목', expectedLeave: 28, death: false, workCategory: '청소작업', cause: '바닥 물기로 인한 미끄러짐' }
        ]
      }
    },
    {
      id: 2,
      name: '삼성건설(주)',
      registrationNumber: '234-56-78901',
      ownerName: '이건설',
      ownerContact: '010-2345-6789',
      contact: '02-2345-6789',
      jurisdiction: '서울남부지방고용노동청',
      industry: '종합건설업',
      industryCategory: 'construction',
      location: '서울특별시 서초구 서초대로 74길 11',
      branchType: '본사',
      employees: 247,
      revenue: 45000000000,
      foundedYear: 2010,
      description: '아파트 및 오피스텔 건설 전문업체',
      allSites: [
        {
          siteName: '강남 푸르지오 아파트 건설현장',
          address: '서울특별시 강남구 개포동 1234',
          client: '대우건설',
          projectType: '공동주택건설',
          progress: 65,
          currentProcess: '내부 마감공사',
          contractAmount: 85000000000,
          status: '진행중',
          startDate: '2023.03.01',
          endDate: '2025.08.31',
          isCurrent: true
        }
      ],
      projectInfo: {
        client: '대우건설',
        mainContractor: '234-56-78901',
        subContractors: [
          {
            field: '철근콘크리트',
            company: '(주)현대철근',
            registrationNumber: '345-67-89012',
            representative: '김철근'
          },
          {
            field: '미장공사',
            company: '(주)벽돌마감',
            registrationNumber: '456-78-90123',
            representative: '박미장'
          }
        ],
        siteName: '강남 푸르지오 아파트 건설현장',
        projectType: '공동주택건설',
        progress: 65,
        currentProcess: '내부 마감공사',
        contractPeriod: '2023.03.01 ~ 2025.08.31',
        contractAmount: 85000000000,
        safetyManager: {
          name: '최안전',
          contact: '010-4567-8901',
          email: 'safety@samsung-const.com',
          license: '건설안전기사',
          appointmentDate: '2023.02.15',
          dismissalDate: '',
          concurrentType: '전담'
        },
        judicialHistory: [
          {
            year: 2024,
            caseType: '중대재해처벌법 위반',
            caseNumber: '서울중앙지법 2024고단5678',
            prosecutionStatus: '기소',
            violationDetail: '추락방지시설 미설치',
            courtResult: '벌금 1억원',
            status: '1심 진행중',
            reason: '12층 높이에서 추락방지망 미설치로 근로자 중상'
          }
        ],
        safetyManagerHistory: [
          { year: 2024, status: '선임', name: '최안전', license: '건설안전기사', appointmentDate: '2023.02.15', dismissalDate: '', reason: '정상근무', education: '40시간 완료' },
          { year: 2023, status: '선임', name: '최안전', license: '건설안전기사', appointmentDate: '2023.02.15', dismissalDate: '', reason: '신규선임', education: '40시간 완료' }
        ],
        accidentHistory: [
          { year: 2020, accidents: 2, deaths: 0, injuries: 3 },
          { year: 2021, accidents: 1, deaths: 0, injuries: 1 },
          { year: 2022, accidents: 3, deaths: 1, injuries: 4 },
          { year: 2023, accidents: 2, deaths: 0, injuries: 3 },
          { year: 2024, accidents: 4, deaths: 0, injuries: 5 }
        ],
        supervisionHistory: [
          { year: 2024, selected: 'Y', reason: '중대재해발생', result: '작업중지명령', jurisdiction: '서울남부지방고용노동청', details: '추락사고 발생으로 현장 전면 작업중지 및 안전조치 완료 후 재개' },
          { year: 2023, selected: 'Y', reason: '산재다발', result: '개선명령', jurisdiction: '서울남부지방고용노동청', details: '안전보건관리체계 전면 개선 및 위험성평가 재실시' },
          { year: 2022, selected: 'Y', reason: '사망사고', result: '작업중지명령', jurisdiction: '서울남부지방고용노동청', details: '크레인 전도사고 사망재해 발생으로 3개월 작업중지' }
        ],
        fineHistory: [
          { year: 2024, violationType: '추락방지시설 미설치', violationDetail: '고소작업장 안전난간 미설치', fineAmount: 15000000, paymentStatus: '미납', paymentDate: '', violationLaw: '산업안전보건법 제38조', reason: '12층 높이 작업에서 추락방지시설 전면 누락' },
          { year: 2023, violationType: '크레인 안전장치 불량', violationDetail: '이동식크레인 과부하방지장치 미작동', fineAmount: 12000000, paymentStatus: '납부완료', paymentDate: '2023.11.20', violationLaw: '산업안전보건법 제91조', reason: '크레인 전도위험 상황에서 안전장치 작동 불량' }
        ],
        accidentDetails: [
          { year: 2024, name: '조**', nationality: '한국', hireDate: '2023.11.01', workType: '일용직', injuryType: '골절', injuryLocation: '척추', expectedLeave: 120, death: false, workCategory: '고소작업', cause: '12층 높이에서 추락방지망 없이 작업 중 추락' },
          { year: 2024, name: '응**', nationality: '베트남', hireDate: '2024.01.15', workType: '일용직', injuryType: '타박상', injuryLocation: '전신', expectedLeave: 45, death: false, workCategory: '철근작업', cause: '크레인 철근 낙하 시 대피 미숙' },
          { year: 2022, name: '홍**', nationality: '한국', hireDate: '2021.08.10', workType: '상용직', injuryType: '압사', injuryLocation: '전신', expectedLeave: 0, death: true, workCategory: '크레인작업', cause: '이동식크레인 전도로 운전자 압사' }
        ]
      }
    },
    {
      id: 3,
      name: '(주)케미칼코리아',
      registrationNumber: '345-67-89012',
      ownerName: '박화학',
      ownerContact: '010-3456-7890',
      contact: '051-3456-7890',
      jurisdiction: '부산지방고용노동청',
      industry: '기초화학물질 제조업',
      industryCategory: 'chemical',
      location: '부산광역시 사상구 주례로 47',
      branchType: '본사',
      employees: 156,
      revenue: 28000000000,
      foundedYear: 2008,
      description: '산업용 화학원료 및 용제 제조업체',
      allSites: [
        {
          siteName: '부산 화학공장 1공장',
          address: '부산광역시 사상구 주례로 47',
          client: '(주)케미칼코리아',
          projectType: '화학물질제조',
          progress: 100,
          currentProcess: '정상운영',
          contractAmount: 28000000000,
          status: '운영중',
          startDate: '2008.01.01',
          endDate: '상시운영',
          isCurrent: true
        }
      ],
      projectInfo: {
        client: '(주)케미칼코리아',
        mainContractor: '345-67-89012',
        subContractors: [],
        siteName: '부산 화학공장 1공장',
        projectType: '화학물질제조',
        progress: 100,
        currentProcess: '정상운영',
        contractPeriod: '상시운영',
        contractAmount: 28000000000,
        safetyManager: {
          name: '한화학',
          contact: '010-5678-9012',
          email: 'safety@chemkor.com',
          license: '화공안전기사',
          appointmentDate: '2022.03.01',
          dismissalDate: '',
          concurrentType: '전담'
        },
        judicialHistory: [
          {
            year: 2023,
            caseType: '화학물질관리법 위반',
            caseNumber: '부산지법 2023고단3456',
            prosecutionStatus: '기소',
            violationDetail: '유독물질 무허가 저장',
            courtResult: '벌금 8천만원',
            status: '확정',
            reason: '톨루엔 50톤 무허가 저장으로 환경오염 위험'
          }
        ],
        safetyManagerHistory: [
          { year: 2024, status: '선임', name: '한화학', license: '화공안전기사', appointmentDate: '2022.03.01', dismissalDate: '', reason: '정상근무', education: '40시간 완료' },
          { year: 2023, status: '선임', name: '한화학', license: '화공안전기사', appointmentDate: '2022.03.01', dismissalDate: '', reason: '정상근무', education: '40시간 완료' },
          { year: 2022, status: '선임', name: '한화학', license: '화공안전기사', appointmentDate: '2022.03.01', dismissalDate: '', reason: '신규선임', education: '40시간 완료' },
          { year: 2021, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '자격자 부재', education: '' },
          { year: 2020, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '코로나19로 선임 지연', education: '' }
        ],
        accidentHistory: [
          { year: 2020, accidents: 1, deaths: 0, injuries: 2 },
          { year: 2021, accidents: 2, deaths: 0, injuries: 2 },
          { year: 2022, accidents: 0, deaths: 0, injuries: 0 },
          { year: 2023, accidents: 1, deaths: 0, injuries: 1 },
          { year: 2024, accidents: 0, deaths: 0, injuries: 0 }
        ],
        supervisionHistory: [
          { year: 2023, selected: 'Y', reason: '화학사고', result: '개선명령', jurisdiction: '부산지방고용노동청', details: '톨루엔 누출사고로 안전관리체계 전면 개선 명령' },
          { year: 2022, selected: 'N', reason: '', result: '', jurisdiction: '', details: '' },
          { year: 2021, selected: 'Y', reason: '무허가저장', result: '과태료', jurisdiction: '부산지방고용노동청', details: '화학물질 무허가 저장 적발' }
        ],
        fineHistory: [
          { year: 2023, violationType: '화학물질 누출', violationDetail: '톨루엔 저장탱크 누출로 인한 대기오염', fineAmount: 25000000, paymentStatus: '분할납부중', paymentDate: '2024.06.01', violationLaw: '화학물질관리법 제25조', reason: '저장시설 노후로 인한 누출사고 발생' },
          { year: 2021, violationType: '무허가 저장', violationDetail: '유독물질 허가량 초과 저장', fineAmount: 18000000, paymentStatus: '납부완료', paymentDate: '2021.12.15', violationLaw: '화학물질관리법 제15조', reason: '허가량 대비 200% 초과 저장' }
        ],
        accidentDetails: [
          { year: 2023, name: '김**', nationality: '한국', hireDate: '2020.05.15', workType: '상용직', injuryType: '화상', injuryLocation: '양손', expectedLeave: 60, death: false, workCategory: '화학물질취급', cause: '톨루엔 누출 시 응급처치 중 화학화상' },
          { year: 2021, name: '이**', nationality: '한국', hireDate: '2019.03.20', workType: '상용직', injuryType: '호흡기장애', injuryLocation: '폐', expectedLeave: 30, death: false, workCategory: '화학물질취급', cause: '환기시설 불량으로 유기용제 흡입' }
        ]
      }
    },
    {
      id: 4,
      name: '행복마트',
      registrationNumber: '456-78-90123',
      ownerName: '정상점',
      ownerContact: '010-4567-8901',
      contact: '02-4567-8901',
      jurisdiction: '서울동부지방고용노동청',
      industry: '종합소매업',
      industryCategory: 'retail',
      location: '서울특별시 송파구 올림픽로 300',
      branchType: '본점',
      employees: 45,
      revenue: 8500000000,
      foundedYear: 2018,
      description: '중형 종합소매점 체인',
      allSites: [
        {
          siteName: '행복마트 송파본점',
          address: '서울특별시 송파구 올림픽로 300',
          client: '행복마트',
          projectType: '소매업운영',
          progress: 100,
          currentProcess: '정상영업',
          contractAmount: 8500000000,
          status: '운영중',
          startDate: '2018.01.01',
          endDate: '상시운영',
          isCurrent: true
        }
      ],
      projectInfo: {
        client: '행복마트',
        mainContractor: '456-78-90123',
        subContractors: [
          {
            field: '청소용역',
            company: '(주)깨끗이',
            registrationNumber: '567-89-01234',
            representative: '김청소'
          }
        ],
        siteName: '행복마트 송파본점',
        projectType: '소매업운영',
        progress: 100,
        currentProcess: '정상영업',
        contractPeriod: '상시운영',
        contractAmount: 8500000000,
        safetyManager: {
          name: '',
          contact: '',
          email: '',
          license: '',
          appointmentDate: '',
          dismissalDate: '',
          concurrentType: '미선임'
        },
        judicialHistory: [],
        safetyManagerHistory: [
          { year: 2024, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '50인 미만 사업장', education: '' },
          { year: 2023, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '50인 미만 사업장', education: '' },
          { year: 2022, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '50인 미만 사업장', education: '' },
          { year: 2021, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '50인 미만 사업장', education: '' },
          { year: 2020, status: '미선임', name: '', license: '', appointmentDate: '', dismissalDate: '', reason: '50인 미만 사업장', education: '' }
        ],
        accidentHistory: [
          { year: 2020, accidents: 0, deaths: 0, injuries: 0 },
          { year: 2021, accidents: 1, deaths: 0, injuries: 1 },
          { year: 2022, accidents: 0, deaths: 0, injuries: 0 },
          { year: 2023, accidents: 0, deaths: 0, injuries: 0 },
          { year: 2024, accidents: 1, deaths: 0, injuries: 1 }
        ],
        supervisionHistory: [
          { year: 2024, selected: 'N', reason: '', result: '', jurisdiction: '', details: '' },
          { year: 2023, selected: 'N', reason: '', result: '', jurisdiction: '', details: '' },
          { year: 2022, selected: 'N', reason: '', result: '', jurisdiction: '', details: '' },
          { year: 2021, selected: 'Y', reason: '정기점검', result: '양호', jurisdiction: '서울동부지방고용노동청', details: '소규모 사업장 정기점검 결과 특이사항 없음' }
        ],
        fineHistory: [
          { year: 2022, violationType: '소방시설 점검 미실시', violationDetail: '소화기 정기점검 6개월 연체', fineAmount: 500000, paymentStatus: '납부완료', paymentDate: '2022.07.10', violationLaw: '소방시설법 제25조', reason: '소화기 12개 정기점검 미실시' }
        ],
        accidentDetails: [
          { year: 2024, name: '박**', nationality: '한국', hireDate: '2022.04.01', workType: '아르바이트', injuryType: '염좌', injuryLocation: '발목', expectedLeave: 14, death: false, workCategory: '판매업무', cause: '계단에서 상품 운반 중 미끄러짐' },
          { year: 2021, name: '최**', nationality: '한국', hireDate: '2020.09.15', workType: '계약직', injuryType: '타박상', injuryLocation: '어깨', expectedLeave: 7, death: false, workCategory: '진열업무', cause: '진열대 상단 상품 정리 중 사다리에서 추락' }
        ]
      }
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePrint = () => window.print();
  const handleSavePDF = () => {
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const ProgressGauge = ({ progress, currentProcess, className = "" }) => {
    return (
      <div className={`${className}`}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-600">진행률</span>
          <span className="text-sm font-semibold text-slate-700">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-slate-400 to-slate-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-slate-600">
          현재 공정: <span className="font-medium text-slate-700">{currentProcess}</span>
        </div>
      </div>
    );
  };

  const generateSupervisionPoints = (business) => {
    const points = [];
    const safetyManagerHistory = business.projectInfo?.safetyManagerHistory || [];
    const fineHistory = business.projectInfo?.fineHistory || [];
    const judicialHistory = business.projectInfo?.judicialHistory || [];
    const accidentHistory = business.projectInfo?.accidentHistory || [];
    const currentYear = new Date().getFullYear();

    const recentProsecution = judicialHistory.find(j => j.prosecutionStatus === '기소' && j.year >= currentYear - 3);
    if (recentProsecution) {
      points.push({
        category: '사법처리이력',
        priority: '상',
        item: `최근 3년 내 ${recentProsecution.caseType} 기소 이력 - 형사처벌 이행사항 중점 점검`,
        detail: `${recentProsecution.year}년 "${recentProsecution.violationDetail}" 관련 ${recentProsecution.courtResult} 처분 후 동일 위험요소 제거 및 안전관리체계 전면 개선 이행상태`
      });
    }

    const unappointedPeriods = safetyManagerHistory.filter(h => h.status === '미선임');
    if (unappointedPeriods.length > 0 && business.employees >= 50) {
      points.push({
        category: '안전관리자미선임',
        priority: '상',
        item: `최근 5년간 안전관리자 미선임 ${unappointedPeriods.length}년 - 법정 의무사항 이행 점검`,
        detail: `${unappointedPeriods.map(p => `${p.year}년(${p.reason})`).join(', ')} 미선임 기간의 안전관리 공백 상태, 현재 선임된 안전관리자의 직무 이행실태`
      });
    }

    const unpaidFines = fineHistory.filter(f => f.paymentStatus === '미납' || f.paymentStatus === '분할납부중');
    if (unpaidFines.length > 0) {
      const totalUnpaid = unpaidFines.reduce((sum, fine) => sum + fine.fineAmount, 0);
      points.push({
        category: '과태료미납',
        priority: '상',
        item: `미납·분할납부 과태료 ${formatCurrency(totalUnpaid)} - 이행강제 및 납부명령 이행상태 점검`,
        detail: `${unpaidFines.map(f => f.violationType).join(', ')} 관련 과태료 납부계획 수립여부, 개선조치 이행실태`
      });
    }

    const recentAccidents = accidentHistory.filter(a => a.year >= currentYear - 3);
    const totalRecentAccidents = recentAccidents.reduce((sum, a) => sum + a.accidents, 0);
    if (totalRecentAccidents >= 3) {
      points.push({
        category: '사고다발사업장',
        priority: '상',
        item: `최근 3년간 총 ${totalRecentAccidents}건 사고발생 - 근본원인 분석 및 예방대책 점검`,
        detail: `사고 패턴 분석, 위험성평가 실효성, 안전보건관리규정 개정·이행 여부, 근로자 안전교육 실시현황`
      });
    }

    if (business.industryCategory === 'manufacturing') {
      points.push({
        category: '기계안전',
        priority: '상',
        item: '위험기계·기구 방호장치 설치 및 작동상태 점검',
        detail: '프레스, 전단기, 연삭기 등 방호장치 설치·작동상태, 비상정지장치 기능점검, 안전작업절차 준수여부'
      });
      points.push({
        category: '밀폐공간안전',
        priority: '상', 
        item: '밀폐공간 작업 시 질식재해 예방조치 이행실태',
        detail: '출입 전 산소농도·유해가스 측정, 환기설비 가동, 감시인 배치, 구조·응급처치 장비 비치상태'
      });
    }

    if (business.industryCategory === 'construction') {
      points.push({
        category: '추락방지',
        priority: '상',
        item: '고소작업장 추락방지시설 설치 및 개인보호구 착용실태',
        detail: '작업발판, 안전난간, 추락방지망 설치상태, 안전대 착용 및 고리걸이 설치, 개구부 덮개 설치여부'
      });
      points.push({
        category: '중장비안전',
        priority: '상',
        item: '이동식크레인 등 건설기계 안전장치 및 운전자격 점검',
        detail: '과부하방지장치, 모멘트리미터 등 안전장치 작동상태, 운전자 자격증명 및 신호수 배치, 작업반경 내 출입통제'
      });
    }

    if (business.industryCategory === 'chemical') {
      points.push({
        category: '화학사고예방',
        priority: '상',
        item: '화학물질 누출·폭발 예방을 위한 안전관리체계 점검',
        detail: '공정안전보고서 작성·이행상태, 화학물질 안전데이터시트(MSDS) 게시·교육, 누출감지장치 및 방재시설 점검'
      });
      points.push({
        category: '위험물저장',
        priority: '상',
        item: '유독물질 저장·취급 허가사항 및 안전기준 준수여부',
        detail: '저장시설 구조·설비기준 적합성, 허가량 대비 저장량 확인, 방류시설 및 응급처치 약품 비치상태'
      });
    }

    points.push({
      category: '안전보건교육',
      priority: '중',
      item: '법정 안전보건교육 실시현황 및 교육내용 적정성 점검',
      detail: '신규채용자, 작업내용 변경자, 정기교육 실시여부, 교육시간 준수, 교육내용의 작업특성 반영도, 교육대장 비치현황'
    });

    points.push({
      category: '작업환경관리',
      priority: '중', 
      item: '작업환경측정 실시 및 결과에 따른 개선조치 이행상태',
      detail: '측정대상 작업장 파악, 측정주기 준수여부, 측정결과 근로자 통보, 노출기준 초과 시 개선조치 이행실태'
    });

    points.push({
      category: '위험성평가',
      priority: '중',
      item: '위험성평가 실시 및 개선조치 이행의 실효성 점검', 
      detail: '전 작업공정 위험성평가 실시여부, 근로자 참여 및 의견수렴, 도출된 개선조치의 이행상태, 정기적 재평가 실시'
    });

    if (business.industryCategory === 'manufacturing') {
      points.push({
        category: '전기안전',
        priority: '중',
        item: '전기설비 안전관리 및 정전작업 안전조치',
        detail: '누전차단기 설치·작동상태, 접지시설 점검, 정전작업 시 안전조치 이행, 임시전선 사용 시 안전기준 준수'
      });
    }

    if (business.industryCategory === 'construction') {
      points.push({
        category: '가설구조물',
        priority: '중',
        item: '비계, 거푸집 등 가설구조물 구조 안전성 및 점검실태',
        detail: '구조계산서 작성·검토, 조립·해체 작업계획서, 작업 전 점검실시, 기상악화 시 보강조치'
      });
    }

    if (business.industryCategory === 'chemical') {
      points.push({
        category: '환기설비',
        priority: '중', 
        item: '국소배기장치 등 환기설비 성능 및 관리상태',
        detail: '설치기준 적합성, 풍량측정 및 성능점검, 정기점검·보수실시, 덕트 및 후드 청소상태'
      });
    }

    points.push({
      category: '안전보건표지',
      priority: '하',
      item: '안전보건표지 부착 및 시설 표시의 적정성 점검',
      detail: '위험장소 경고표지, 개인보호구 착용표지, 비상구 및 대피경로 표시, 화재진압설비 위치표시'
    });

    points.push({
      category: '응급처치',
      priority: '하',
      item: '응급처치 시설·장비 비치 및 응급처치자 양성현황',
      detail: '구급약품 비치 및 관리상태, 응급처치에 필요한 기구·약품 구비, 응급처치교육 이수자 배치현황'
    });

    points.push({
      category: '개인보호구',
      priority: '하',
      item: '개인보호구 지급·착용 관리 및 성능유지 상태',
      detail: '작업별 적정 보호구 지급여부, 근로자 착용실태, 보호구 성능검사 및 교체주기 관리, 청결상태 유지'
    });

    points.push({
      category: '안전점검',
      priority: '하',
      item: '일상점검 및 정기점검 실시 현황과 점검표 작성·보관',
      detail: '작업 전 일상점검 실시, 정기점검 계획 수립·이행, 점검표 작성의 구체성, 점검결과에 따른 조치사항 기록'
    });

    if (business.industryCategory === 'retail') {
      points.push({
        category: '고객안전',
        priority: '하',
        item: '고객 이용구역 안전관리 및 사고예방 조치상태',
        detail: '진열대 고정상태, 통로 확보 및 바닥 미끄럼 방지조치, 계단 안전손잡이 설치, 비상시 대피안내'
      });
      
      points.push({
        category: '화재예방',
        priority: '중',
        item: '소방시설 점검 및 화재예방 관리체계',
        detail: '소화기 정기점검, 화재감지기 작동상태, 비상구 확보, 전열기구 사용 안전관리, 화재대피계획 수립·훈련'
      });
    }

    return points;
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.registrationNumber.includes(searchTerm) ||
      business.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJurisdiction = selectedJurisdiction === '' || 
      business.jurisdiction === selectedJurisdiction;
    
    return matchesSearch && matchesJurisdiction;
  });

  const generateReport = async (business) => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedReport = {
        businessInfo: business,
        supervisionPoints: generateSupervisionPoints(business),
        supervisionType: supervisionType
      };
      setReport(generatedReport);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .bg-gradient-to-br { background: white !important; }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-blue-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 p-2 rounded-xl">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-700">
                종합 산업안전·근로감독 시스템
              </h1>
            </div>
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setSupervisionType('industrial')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  supervisionType === 'industrial' 
                    ? 'bg-slate-300 text-slate-700 shadow-md' 
                    : 'text-slate-600 hover:text-slate-700'
                }`}
              >
                🏭 산업안전감독관
              </button>
              <button
                onClick={() => setSupervisionType('labor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  supervisionType === 'labor' 
                    ? 'bg-slate-300 text-slate-700 shadow-md' 
                    : 'text-slate-600 hover:text-slate-700'
                }`}
              >
                💼 근로감독관
              </button>
            </div>
          </div>
          
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="사업장명, 등록번호, 사업주명으로 검색하세요..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                className="py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all appearance-none min-w-48"
              >
                <option value="">전체 관할지청</option>
                <option value="안산지방고용노동청">안산지방고용노동청</option>
                <option value="서울남부지방고용노동청">서울남부지방고용노동청</option>
                <option value="부산지방고용노동청">부산지방고용노동청</option>
                <option value="서울동부지방고용노동청">서울동부지방고용노동청</option>
              </select>
            </div>
          </div>

          {(searchTerm.trim() || selectedJurisdiction) && filteredBusinesses.length > 0 && (
            <div className="mt-6 bg-slate-100 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                검색 결과
              </h3>
              {filteredBusinesses.map((business) => (
                <div key={business.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-slate-600" />
                      {business.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
                        {business.industry}
                      </span>
                      <span className="text-xs bg-slate-300 text-slate-700 px-2 py-1 rounded-full">
                        {business.employees}명
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm mb-4">
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <span className="font-medium text-slate-600">등록번호</span>
                      <div className="text-slate-700">{business.registrationNumber}</div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <span className="font-medium text-slate-600">사업주</span>
                      <div className="text-slate-700">{business.ownerName}</div>
                      <div className="text-xs text-slate-600">{business.ownerContact}</div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <span className="font-medium text-slate-600">사업장 연락처</span>
                      <div className="text-slate-700">{business.contact}</div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <span className="font-medium text-slate-600">관할지청</span>
                      <div className="text-slate-700 text-xs">{business.jurisdiction}</div>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <span className="font-medium text-slate-600">소재지</span>
                      <div className="text-slate-700">{business.location}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => generateReport(business)}
                    disabled={isGenerating}
                    className="w-full py-3 px-4 rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-slate-300 hover:bg-slate-400 text-slate-700 shadow-md"
                  >
                    <Target className="w-4 h-4" />
                    {isGenerating ? '분석 중...' : 
                      supervisionType === 'industrial' ? '산업안전 감독착안사항 생성' : '근로감독 착안사항 생성'
                    }
                  </button>
                </div>
              ))}
            </div>
          )}

          {!searchTerm.trim() && !selectedJurisdiction && (
            <div className="text-center py-16 bg-slate-100 rounded-xl mt-6">
              <div className="bg-slate-200 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Shield className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-700 mb-3">
                {supervisionType === 'industrial' ? '산업안전감독 전용 시스템' : '근로감독 전용 시스템'}
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                {supervisionType === 'industrial' 
                  ? '모든 업종의 사업장을 검색하여 산업재해 예방 중심의 감독착안사항을 자동 생성합니다.'
                  : '사업장의 근로조건을 검색하여 근로기준법 위반사항 중심의 감독착안사항을 자동 생성합니다.'
                }
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-lg">
                  <Target className="w-4 h-4" />
                  AI 기반 분석
                </span>
                <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-lg">
                  <Shield className="w-4 h-4" />
                  업종별 특화
                </span>
                <span className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-lg">
                  <BarChart3 className="w-4 h-4" />
                  실시간 보고서
                </span>
              </div>
            </div>
          )}
        </div>

        {report && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6" id="supervision-report">
            <div className="flex items-center justify-between mb-8 no-print">
              <div className="flex items-center gap-3">
                <div className="bg-slate-200 p-2 rounded-xl">
                  <Target className="w-6 h-6 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {report.businessInfo.name} {report.supervisionType === 'industrial' ? '산업안전' : '근로'} 감독착안사항 보고서
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  인쇄
                </button>
                <button
                  onClick={handleSavePDF}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  PDF저장
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              
              <div className="col-span-12 bg-slate-100 p-4 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  1. 사업장 프로젝트 구조
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 p-3 rounded-lg text-center flex-1">
                    <div className="text-xs text-slate-600 mb-1">🏢 발주자</div>
                    <div className="font-medium text-slate-800">
                      {report.businessInfo.projectInfo?.client || '미등록'}
                    </div>
                    <div className="text-xs text-slate-800 mt-1">
                      발주자등록번호미상
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="text-slate-500 text-xl">▶</div>
                  </div>

                  <div className="bg-slate-200 p-3 rounded-lg text-center flex-1">
                    <div className="text-xs text-slate-600 mb-1">🏭 원수급</div>
                    <div className="font-medium text-slate-800">{report.businessInfo.name}</div>
                    <div className="text-xs text-slate-800 mt-1">
                      {report.businessInfo.registrationNumber}
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="text-slate-500 text-xl">▶</div>
                  </div>

                  <div className="bg-slate-200 p-3 rounded-lg text-center flex-1 relative">
                    <div className="text-xs text-slate-600 mb-1">🔧 하수급</div>
                    {report.businessInfo.projectInfo?.subContractors && report.businessInfo.projectInfo.subContractors.length > 1 && (
                      <button
                        onClick={() => setShowSubContractors(!showSubContractors)}
                        className="absolute top-2 right-2 text-xs bg-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-400 transition-all"
                      >
                        {showSubContractors ? '접기' : '상세보기'}
                      </button>
                    )}
                    {report.businessInfo.projectInfo?.subContractors ? (
                      <div className="space-y-1">
                        {(showSubContractors ? report.businessInfo.projectInfo.subContractors : report.businessInfo.projectInfo.subContractors.slice(0, 1)).map((sub, index) => (
                          <div key={index}>
                            <div className="font-medium text-slate-800 flex items-center justify-center gap-1">
                              <span className="bg-slate-300 text-slate-800 px-1 py-0.5 rounded text-xs">
                                {sub.field === '철근콘크리트' ? '철콘' : 
                                 sub.field === '토목공사' ? '토목' :
                                 sub.field === '전기설비' ? '전기' : sub.field}
                              </span>
                              {sub.company}
                            </div>
                            <div className="text-xs text-slate-800 mt-1">{sub.registrationNumber}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="font-medium text-slate-800">직접시공</div>
                    )}
                  </div>

                  <div className="px-2">
                    <div className="text-slate-500 text-xl">▶</div>
                  </div>

                  <div className="bg-slate-200 p-3 rounded-lg text-center flex-1 relative">
                    <div className="text-xs text-slate-600 mb-1 flex items-center justify-center gap-1">
                      🗗️ 현장 <span className="bg-blue-300 text-blue-800 px-1 rounded">☆</span>
                    </div>
                    <button
                      onClick={() => setShowCurrentSite(!showCurrentSite)}
                      className="absolute top-2 right-2 text-xs bg-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-400 transition-all"
                    >
                      {showCurrentSite ? '접기' : '상세보기'}
                    </button>
                    <div className="font-medium text-slate-800">{report.businessInfo.projectInfo?.siteName || '현장명 미등록'}</div>
                    <div className="text-xs text-slate-800 mt-1">
                      {report.businessInfo.registrationNumber}
                    </div>
                    <div className="text-sm font-semibold text-slate-700 mt-1">
                      {formatCurrency(report.businessInfo.projectInfo?.contractAmount || 0)}
                    </div>
                    
                    {showCurrentSite && (
                      <div className="mt-3 bg-white/50 p-2 rounded text-xs space-y-1">
                        <div>
                          <span className="text-slate-600">시작일:</span> <span className="font-medium text-slate-800">{report.businessInfo.allSites?.find(s => s.isCurrent)?.startDate || '미등록'}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">종료일:</span> <span className="font-medium text-slate-800">{report.businessInfo.allSites?.find(s => s.isCurrent)?.endDate || '미등록'}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">발주처:</span> <span className="font-medium text-slate-800">{report.businessInfo.projectInfo?.client || '미등록'}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">공사종류:</span> <span className="font-medium text-slate-800">{report.businessInfo.projectInfo?.projectType || '미등록'}</span>
                        </div>
                      </div>
                    )}
                    
                    <ProgressGauge 
                      progress={report.businessInfo.projectInfo?.progress || 0}
                      currentProcess={report.businessInfo.projectInfo?.currentProcess || '미등록'}
                      className="mt-2"
                    />
                  </div>
                </div>

                {report.businessInfo.projectInfo?.safetyManager && (
                  <div className="mt-4 bg-slate-200 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        안전보건관리자
                      </h4>
                      <button
                        onClick={() => setShowSafetyManager(!showSafetyManager)}
                        className="text-xs bg-slate-300 text-slate-700 px-2 py-1 rounded hover:bg-slate-400 transition-all"
                      >
                        {showSafetyManager ? '접기' : '상세보기'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">성명:</span> <span className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">연락처:</span> <span className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.contact}</span>
                      </div>
                    </div>

                    {showSafetyManager && (
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm bg-white/50 p-3 rounded-lg">
                        <div>
                          <span className="text-slate-600">이메일:</span> <div className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.email}</div>
                        </div>
                        <div>
                          <span className="text-slate-600">자격증:</span> <div className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.license}</div>
                        </div>
                        <div>
                          <span className="text-slate-600">선임일:</span> <div className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.appointmentDate}</div>
                        </div>
                        <div>
                          <span className="text-slate-600">해임일:</span> <div className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.dismissalDate || '현재 근무중'}</div>
                        </div>
                        <div>
                          <span className="text-slate-600">겸직구분:</span> <div className="font-medium text-slate-800">{report.businessInfo.projectInfo.safetyManager.concurrentType}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {report.businessInfo.projectInfo?.accidentHistory && (
                <div className="col-span-6 bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    2. 산재현황 도표
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-200">
                        <tr>
                          <th className="px-2 py-1 text-center font-medium text-slate-700">구분</th>
                          {report.businessInfo.projectInfo.accidentHistory.map((accident, index) => (
                            <th key={index} className="px-2 py-1 text-center font-medium text-slate-700">{accident.year}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="px-2 py-1 text-center font-medium text-slate-600">사고건수</td>
                          {report.businessInfo.projectInfo.accidentHistory.map((accident, index) => (
                            <td key={index} className="px-2 py-1 text-center">
                              <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                                accident.accidents > 0 ? 'bg-red-200 text-red-800' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {accident.accidents}
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="px-2 py-1 text-center font-medium text-slate-600">부상자수</td>
                          {report.businessInfo.projectInfo.accidentHistory.map((accident, index) => (
                            <td key={index} className="px-2 py-1 text-center">
                              <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                                accident.injuries > 0 ? 'bg-orange-200 text-orange-800' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {accident.injuries}
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-white">
                          <td className="px-2 py-1 text-center font-medium text-slate-600">사망자수</td>
                          {report.businessInfo.projectInfo.accidentHistory.map((accident, index) => (
                            <td key={index} className="px-2 py-1 text-center">
                              <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                                accident.deaths > 0 ? 'bg-red-300 text-red-900' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {accident.deaths}
                              </span>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {report.businessInfo.projectInfo?.accidentDetails && (
                <div className={`col-span-6 bg-slate-100 p-4 rounded-xl border border-slate-200 transition-all ${
                  showAccidentDetails ? 'max-h-none' : ''
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      3. 재해자 인적사항 (총 {report.businessInfo.projectInfo.accidentDetails.length}명)
                    </h3>
                    {report.businessInfo.projectInfo.accidentDetails.length > 1 && (
                      <button
                        onClick={() => setShowAccidentDetails(!showAccidentDetails)}
                        className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 transition-all"
                      >
                        {showAccidentDetails ? '접기' : '상세보기'}
                      </button>
                    )}
                  </div>
                  <div className={`space-y-2 ${showAccidentDetails ? 'overflow-visible' : 'overflow-hidden'}`}>
                    {(showAccidentDetails ? report.businessInfo.projectInfo.accidentDetails : report.businessInfo.projectInfo.accidentDetails.slice(0, 1))
                      .map((detail, index) => (
                      <div key={index} className="bg-white/70 p-3 rounded-lg text-xs border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{detail.year}년 {detail.name}</span>
                            <span className="bg-slate-200 text-slate-700 px-1 py-0.5 rounded text-xs">
                              {detail.nationality}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded font-medium text-xs ${
                            detail.workCategory === '기계작업' ? 'bg-red-200 text-red-800' :
                            detail.workCategory === '화학물질취급' ? 'bg-orange-200 text-orange-800' :
                            detail.workCategory === '중장비작업' ? 'bg-blue-200 text-blue-800' :
                            'bg-slate-200 text-slate-800'
                          }`}>
                            {detail.workCategory}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-2">
                          <div>
                            <span className="text-slate-500">입사:</span> {detail.hireDate} ({detail.workType})
                          </div>
                          <div>
                            <span className="text-slate-500">상해:</span> {detail.injuryType} - {detail.injuryLocation}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <div className="text-slate-600 bg-slate-100 p-1 rounded flex-1 mr-2">
                            원인: {detail.cause}
                          </div>
                          <div className="text-slate-700 font-medium">
                            {detail.death ? '사망' : `${detail.expectedLeave}일`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.businessInfo.projectInfo?.supervisionHistory && (
                <div className="col-span-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    4. 감독선정 이력
                  </h3>
                  <div className="space-y-2">
                    {report.businessInfo.projectInfo.supervisionHistory.slice(-3).map((history, index) => (
                      <div key={index} className="bg-white/70 p-2 rounded-lg text-xs border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{history.year}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            history.selected === 'Y' ? 'bg-red-200 text-red-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {history.selected === 'Y' ? history.reason : '미선정'}
                          </span>
                        </div>
                        {history.selected === 'Y' && (
                          <div className="space-y-1">
                            <div className="text-slate-700">
                              <span className="font-medium">관할:</span> {history.jurisdiction}
                            </div>
                            <div className={`font-medium ${
                              history.result === '양호' ? 'text-green-700' :
                              history.result === '경고' ? 'text-orange-700' : 'text-red-700'
                            }`}>
                              결과: {history.result}
                            </div>
                            <div className="text-xs text-slate-600 bg-slate-100 p-1 rounded">
                              {history.details}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.businessInfo.projectInfo?.judicialHistory && (
                <div className="col-span-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    5. 사법처리현황
                  </h3>
                  <div className="space-y-2">
                    {report.businessInfo.projectInfo.judicialHistory.slice(0, 2).map((case_info, index) => (
                      <div key={index} className="bg-white/70 p-2 rounded-lg text-xs border border-slate-200">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{case_info.year}</span>
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            case_info.prosecutionStatus === '기소' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                          }`}>
                            {case_info.prosecutionStatus}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-slate-700">
                            <span className="font-medium">사건:</span> {case_info.caseType}
                          </div>
                          <div className="text-slate-700">
                            <span className="font-medium">결과:</span> {case_info.courtResult}
                          </div>
                          <div className="text-xs text-slate-600 bg-slate-100 p-1 rounded">
                            {case_info.reason}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.businessInfo.projectInfo?.fineHistory && (
                <div className="col-span-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <PiggyBank className="w-4 h-4" />
                    6. 과태료 현황
                  </h3>
                  <div className="space-y-2">
                    {report.businessInfo.projectInfo.fineHistory.slice(0, 3).map((fine, index) => (
                      <div key={index} className="bg-white/70 p-2 rounded-lg text-xs border border-slate-200">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{fine.year}</span>
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            fine.paymentStatus === '납부완료' ? 'bg-green-200 text-green-800' :
                            fine.paymentStatus === '미납' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
                          }`}>
                            {fine.paymentStatus === '납부완료' && '✅'}
                            {fine.paymentStatus === '미납' && '🚨'}
                            {fine.paymentStatus === '분할납부중' && '🟡'}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-slate-700">
                            <span className="font-medium">위반:</span> {fine.violationType}
                          </div>
                          <div className="text-red-600 font-medium">{formatCurrency(fine.fineAmount)}</div>
                          <div className="text-xs text-slate-600 bg-slate-100 p-1 rounded">
                            {fine.reason}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.businessInfo.projectInfo?.safetyManagerHistory && (
                <div className="col-span-3 bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    7. 안전관리자 선임
                  </h3>
                  <div className="space-y-2">
                    {report.businessInfo.projectInfo.safetyManagerHistory.slice(0, 3).map((history, index) => (
                      <div key={index} className="bg-white/70 p-2 rounded-lg text-xs border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{history.year}</span>
                          <span className={`px-1 py-0.5 rounded text-xs ${
                            history.status === '선임' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {history.status === '선임' ? '✅' : '❌'}
                          </span>
                        </div>
                        {history.status === '선임' ? (
                          <div className="space-y-1">
                            <div className="text-slate-700">
                              <span className="font-medium">성명:</span> {history.name}
                            </div>
                            <div className="text-slate-700">
                              <span className="font-medium">자격:</span> {history.license}
                            </div>
                            <div className="text-slate-700">
                              <span className="font-medium">선임일:</span> {history.appointmentDate}
                            </div>
                            {history.education && (
                              <div className="text-xs text-slate-600">교육: {history.education}</div>
                            )}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-600 bg-slate-100 p-1 rounded">
                            미선임 사유: {history.reason}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-center bg-white/70 rounded p-1">
                    <span className="text-green-700">선임: {report.businessInfo.projectInfo.safetyManagerHistory.filter(h => h.status === '선임').length}년</span> | 
                    <span className="text-red-700 ml-1">미선임: {report.businessInfo.projectInfo.safetyManagerHistory.filter(h => h.status === '미선임').length}년</span>
                  </div>
                </div>
              )}

              {report.businessInfo.allSites && (
                <div className="col-span-12 bg-slate-100 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      8. 전체 현장 현황 (총 {report.businessInfo.allSites.length}개)
                    </h3>
                    <button
                      onClick={() => setShowAllSites(!showAllSites)}
                      className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300 transition-all"
                    >
                      {showAllSites ? '접기' : '상세보기'}
                    </button>
                  </div>
                  
                  {showAllSites ? (
                    <div className="grid grid-cols-3 gap-3">
                      {report.businessInfo.allSites.map((site, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                          site.isCurrent ? 'bg-slate-200 border-slate-400' : 'bg-white/70 border-slate-200'
                        }`}>
                          <div className="flex items-center gap-1 mb-2">
                            {site.isCurrent && <span className="text-slate-700 bg-slate-400 px-1 rounded text-xs">☆</span>}
                            <span className="font-medium text-sm">{site.siteName}</span>
                          </div>
                          <div className="text-xs text-slate-600 space-y-1 mb-2">
                            <div>{site.client}</div>
                            <div>{formatCurrency(site.contractAmount)}</div>
                          </div>
                          <ProgressGauge 
                            progress={site.progress}
                            currentProcess={site.currentProcess}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-700">
                      현재 감독대상: <span className="font-medium">{report.businessInfo.allSites.find(s => s.isCurrent)?.siteName}</span>
                      <ProgressGauge 
                        progress={report.businessInfo.allSites.find(s => s.isCurrent)?.progress || 0}
                        currentProcess={report.businessInfo.allSites.find(s => s.isCurrent)?.currentProcess || '미등록'}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="col-span-12 bg-slate-100 p-4 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  9. 산업안전 감독착안사항
                  <span className="text-sm bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
                    {report.supervisionPoints.length}개 항목
                  </span>
                </h3>
                
                <div className="grid gap-3">
                  {report.supervisionPoints
                    .sort((a, b) => {
                      const priorityOrder = { '상': 1, '중': 2, '하': 3 };
                      return priorityOrder[a.priority] - priorityOrder[b.priority];
                    })
                    .map((point, index) => (
                      <div key={index} className={`p-4 rounded-xl bg-white/80 border-l-4 ${
                        point.priority === '상' ? 'border-l-slate-500' :
                        point.priority === '중' ? 'border-l-slate-400' : 'border-l-slate-300'
                      } border border-slate-200`}>
                        <div className="flex items-start gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            point.priority === '상' ? 'bg-slate-300 text-slate-800' :
                            point.priority === '중' ? 'bg-slate-200 text-slate-700' : 
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {point.priority}
                          </span>
                          <span className="text-sm bg-slate-200 text-slate-700 px-2 py-1 rounded">
                            {point.category}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium text-slate-800 mb-1">{point.item}</div>
                            <div className="text-sm text-slate-600 leading-relaxed">{point.detail}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-200 p-3 rounded-lg">
                    <div className="text-xl font-bold text-slate-800">
                      {report.supervisionPoints.filter(p => p.priority === '상').length}개
                    </div>
                    <div className="text-slate-600">상급 우선순위</div>
                  </div>
                  <div className="bg-slate-300 p-3 rounded-lg">
                    <div className="text-xl font-bold text-slate-800">
                      {report.supervisionPoints.filter(p => p.priority === '중').length}개
                    </div>
                    <div className="text-slate-600">중급 우선순위</div>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <div className="text-xl font-bold text-slate-700">
                      {report.supervisionPoints.filter(p => p.priority === '하').length}개
                    </div>
                    <div className="text-slate-600">하급 우선순위</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-600 no-print">
              감독착안사항 생성일: {new Date().toLocaleDateString('ko-KR')} | 
              총 {report.supervisionPoints.filter(p => p.priority === '상').length}개 상급, 
              {report.supervisionPoints.filter(p => p.priority === '중').length}개 중급, 
              {report.supervisionPoints.filter(p => p.priority === '하').length}개 하급 사항
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisionSystem;
