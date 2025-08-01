# 🧓 시니어 복지 정보 알림 앱

> 시니어(노인)를 위한 복지 정보 및 일정 알림 Progressive Web App

## 📋 프로젝트 개요

시니어 분들이 복지 혜택, 복지관 일정, 식단표 등을 쉽게 확인할 수 있는 PWA 앱입니다. 시니어 친화적인 UI/UX와 음성 안내 기능을 제공하여 디지털 접근성을 높였습니다.

## ✨ 주요 기능

### 🏠 메인 기능
- **위치 기반 복지 정보**: 사용자 위치에 따른 지역별 복지 혜택 정보
- **복지관 일정표**: 지역 복지관의 프로그램 일정 및 이벤트 정보
- **식단표**: 복지관 및 경로당 식단 정보
- **푸시 알림**: 관리자(복지센터)에서 발송하는 중요 공지사항

### 🎯 시니어 친화적 기능
- **TTS 음성 안내**: 시각적 제약이 있는 사용자를 위한 음성 안내
- **큰 글꼴 및 버튼**: 시니어 친화적 UI 디자인
- **고대비 모드**: 시각적 접근성 개선
- **간단한 네비게이션**: 직관적이고 단순한 메뉴 구조

### 👨‍👩‍👧‍👦 보호자 기능
- **보호자 모드**: 자녀 보호자가 부모님의 정보를 확인
- **긴급 연락처**: 빠른 응급 상황 대응

## 🛠️ 기술 스택

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **React Router** - 클라이언트 사이드 라우팅
- **Lucide React** - 아이콘 라이브러리
- **PWA** - Service Worker + Web App Manifest

### Backend & 클라우드
- **Firebase Firestore** - 실시간 데이터베이스
- **Firebase Authentication** - 사용자 인증
- **Firebase Cloud Messaging (FCM)** - 푸시 알림
- **Geolocation API** - 위치 기반 서비스

### 접근성 & UX
- **Web Speech API (TTS)** - 음성 안내
- **ARIA 라벨** - 스크린 리더 지원
- **고대비 모드** - 시각적 접근성
- **큰 터치 영역** - 터치 친화적 인터페이스

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **환경변수 설정**
   ```bash
   cp .env.example .env
   ```
   `.env` 파일에서 Firebase 설정 정보를 입력하세요.

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   브라우저에서 http://localhost:5173 으로 접속

4. **빌드**
   ```bash
   npm run build
   ```

## 📱 PWA 기능

이 앱은 Progressive Web App으로 제작되어 다음 기능을 지원합니다:

- **오프라인 지원**: Service Worker를 통한 캐싱
- **홈 화면에 추가**: 네이티브 앱처럼 사용 가능
- **푸시 알림**: 중요한 복지 정보 알림
- **자동 업데이트**: 새 버전 자동 업데이트

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #2563eb (파란색 - 신뢰감)
- **Secondary**: #10b981 (초록색 - 안정감)
- **Accent**: #f59e0b (주황색 - 주의집중)
- **Danger**: #dc2626 (빨간색 - 긴급상황)

### 타이포그래피
- **기본 글꼴 크기**: 18px (시니어 친화적)
- **제목**: 24px ~ 36px
- **최소 터치 영역**: 48px × 48px

## 📂 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   └── features/       # 기능별 컴포넌트
├── pages/              # 페이지 컴포넌트
├── services/           # Firebase 서비스
├── types/              # TypeScript 타입 정의
├── styles/             # 전역 스타일
└── utils/              # 유틸리티 함수
```

## 🧪 테스트

```bash
# 단위 테스트 실행
npm run test

# 테스트 커버리지 확인
npm run test:coverage
```

## 📦 배포

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
npm run build
vercel --prod
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

문의사항이 있으시면 다음으로 연락주세요:
- 이메일: support@senior-welfare.app
- 전화: 02-123-4567

---

**Made with ❤️ for Korean Seniors**

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
