# White Chat - Code Security Tool

AI 툴에 코드를 붙여넣기 전 보안을 위해 더미 데이터로 치환해주는 Electron 데스크톱 애플리케이션입니다.

## 주요 기능

- **코드 입력 및 문법 감지**: Monaco Editor를 사용한 코드 편집기
- **자동 언어 감지**: 코드 패턴을 기반으로 프로그래밍 언어 자동 감지
- **실시간 문법 하이라이팅**: 지원하는 언어에 대한 실시간 문법 하이라이팅
- **코드 뷰어**: 치환된 코드를 별도 창에서 확인

## 개발 환경 설정

### 필수 요구사항
- Node.js 16 이상
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치
```bash
npm install
```

2. 개발 모드 실행
```bash
npm run dev
```

3. 프로덕션 빌드
```bash
npm run build
```

## 프로젝트 구조

```
white-chat/
├── src/
│   ├── main/           # Electron 메인 프로세스
│   ├── renderer/       # React 렌더러 프로세스
│   │   ├── components/ # React 컴포넌트들
│   │   └── styles/     # CSS 스타일
│   └── shared/         # 공유 타입 및 상수
├── public/             # 정적 파일들
└── dist/               # 빌드 출력 디렉토리
```

## 기술 스택

- **Electron**: 크로스 플랫폼 데스크톱 앱
- **React**: UI 프레임워크 (TypeScript)
- **Monaco Editor**: 코드 편집 및 문법 하이라이팅
- **Webpack**: 모듈 번들러
- **TypeScript**: 타입 안전성

## 지원 언어

- JavaScript/TypeScript
- Python
- Java
- C++
- C#
- PHP
- Go
- Rust
- HTML/CSS
- JSON

## 라이선스

ISC 