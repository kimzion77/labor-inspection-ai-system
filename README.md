# AI 근로계약서 분석 및 작성 도우미

이 프로젝트는 근로계약서 이미지를 업로드하면 AI가 내용을 분석하여 법률적 검토를 수행하고, 올바른 표준 근로계약서를 생성해주는 서비스입니다.

## 🚀 주요 기능

1. **계약서 이미지 업로드 & OCR**
   - 이미지에서 텍스트를 추출하고 자동 보정합니다.

2. **AI 데이터 구조화**
   - 비정형 텍스트를 분석하여 임금, 근로시간, 휴일 등 핵심 정보를 구조화합니다.

3. **법률 위반 검토 (AI Analysis)**
   - 근로기준법 및 최신 노동법 판례를 기반으로 위법 조항을 탐지합니다.
   - ⚠️ 주의, ❌ 위반, ✅ 통과 등으로 알기 쉽게 표시합니다.

4. **표준 계약서 생성**
   - 분석된 데이터를 바탕으로 법적 효력이 있는 표준 근로계약서를 자동 생성합니다.
   - Word 및 PDF 다운로드를 지원합니다.



## 🛠️ 기술 스택

- **Frontend**: React, Vite, Framer Motion
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-5.2
- **Utils**: SheetJS (Excel), html2canvas, jsPDF

## 📦 설치 및 실행 방법

### 1. 환경 변수 설정
루트 디렉토리에 `.env` 파일을 생성하고 다음 키를 입력하세요.
```
OPENAI_API_KEY=your_api_key_here
```

### 2. 패키지 설치
루트와 server 폴더에서 각각 패키지를 설치해야 합니다.

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 3. 서버 실행
두 개의 터미널에서 각각 실행하거나, Concurrent 명령어를 사용하세요.

**Terminal 1 (Backend):**
```bash
cd server
node index.js
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## 📁 폴더 구조

- `/src`: React 프론트엔드 소스코드
  - `/components`: 컴포넌트 (admin, analysis, common 등)
  - `/data`: 정적 데이터 및 상수
  - `/pages`: 페이지 컴포넌트
  - `/utils`: 유틸리티 함수
- `/server`: Node.js 백엔드 서버
  - `/data`: 참조 데이터 (Excel, CSV)
  - `/routes`: API 라우트
- `/resources`: 이미지 등 자원 파일
