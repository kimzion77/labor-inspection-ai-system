# 노동법 안내 프로젝트 (분리 백업)

이 폴더는 `test` 프로젝트에서 분리한 **노동법 안내 기능** 파일들입니다.

## 포함 파일

### 페이지 (`src/pages/`)
- `LaborGuideHome.jsx` - 메인 홈
- `ChecklistPage.jsx` / `ChecklistAdvancedPage.jsx` - 의무 체크리스트
- `SituationGuide.jsx` / `SituationDetail.jsx` - 상황별 가이드
- `CasesAndFAQ.jsx` - 위반사례 & FAQ
- `AIConsult.jsx` - AI 상담

### 컴포넌트 (`src/components/`)
- `DoneMobileLayout.jsx` - 모바일 레이아웃
- `laborGuide/layout/MobileLayout.jsx` - 가이드 레이아웃

### CSS (`src/css/`)
- `done-styles.css` - 체크리스트 전용 스타일
- `labor-guide.css` - 가이드 레이아웃 스타일

### 데이터 (`src/data/laborLaw/`)
- `obligations.json` / `obligationsAdvanced.json` - 의무사항 25개
- `situations.json` - 상황별 가이드 5개
- `cases.json` / `violationCases.json` - 위반사례 10개
- `faqData.json` - FAQ 10개
- `categories.json` / `topicIndex.json` - 카테고리/인덱스
- `topics/` - 29개 주제별 상세 법률 JSON

## 원본 프로젝트
`c:\Users\Jini\Desktop\김지은\01_개발\test`
