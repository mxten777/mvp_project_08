# 시니어 복지 정보 알림 앱 - GitHub Copilot 지침

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## 프로젝트 개요
이 프로젝트는 시니어(노인)을 위한 복지 정보 알림 앱입니다. React PWA + Firebase 기반으로 제작되며, 시니어 친화적인 UI/UX를 제공합니다.

## 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Firebase (Firestore, FCM, Authentication)
- **UI/UX**: 시니어 친화적 디자인 (큰 글꼴, 큰 버튼, 높은 대비)
- **PWA**: Service Worker + Web App Manifest
- **기타**: TTS(음성 안내), 위치 기반 서비스, 푸시 알림

## 주요 기능
1. **위치 기반 복지 정보**: 사용자 위치에 따른 지역별 복지 혜택 정보 제공
2. **복지관 일정표**: 지역 복지관의 프로그램 일정 및 이벤트 정보
3. **식단표**: 복지관 및 경로당 식단 정보
4. **TTS 음성 안내**: 시각적 제약이 있는 사용자를 위한 음성 안내
5. **푸시 알림**: 관리자(복지센터)에서 발송하는 중요 공지사항
6. **보호자 모드**: 자녀 보호자가 부모님의 정보를 확인할 수 있는 기능

## 코딩 가이드라인

### UI/UX 설계 원칙
- **큰 글꼴**: 최소 16px 이상, 제목은 24px 이상
- **큰 터치 영역**: 버튼은 최소 44px × 44px 이상
- **높은 대비**: 배경과 텍스트 간 명확한 색상 대비
- **단순한 네비게이션**: 복잡한 메뉴 구조 지양
- **명확한 피드백**: 사용자 액션에 대한 즉각적인 시각적/청각적 피드백

### 컴포넌트 구조
```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Card, etc.)
│   ├── layout/         # 레이아웃 컴포넌트
│   └── features/       # 기능별 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
├── services/           # Firebase 서비스
├── types/              # TypeScript 타입 정의
└── styles/             # 스타일 관련 파일
```

### Firebase 구조
```
collections:
- welfare_info/         # 복지 정보
- schedules/           # 일정표
- menus/               # 식단표
- notifications/       # 알림
- users/               # 사용자 정보
- locations/           # 위치별 복지관 정보
```

### 접근성 고려사항
- ARIA 라벨 적극 활용
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 고대비 모드 지원
- 폰트 크기 조절 기능

### 성능 최적화
- 이미지 최적화 (WebP 포맷 우선)
- 코드 스플리팅 (lazy loading)
- 서비스 워커를 통한 캐싱
- Firebase 쿼리 최적화

### 보안 고려사항
- Firebase Security Rules 설정
- 사용자 인증 상태 관리
- 개인정보 보호 (위치 정보 등)
- XSS 방지

## 명명 규칙
- 컴포넌트: PascalCase (예: `WelfareCard`)
- 파일명: kebab-case (예: `welfare-card.tsx`)
- 함수: camelCase (예: `fetchWelfareInfo`)
- 상수: UPPER_SNAKE_CASE (예: `API_ENDPOINTS`)

## 코드 품질
- ESLint + Prettier 사용
- TypeScript strict 모드 활성화
- 단위 테스트 작성 (Jest + React Testing Library)
- 컴포넌트별 Storybook 문서화
