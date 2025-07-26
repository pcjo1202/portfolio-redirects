# 🔗 Redirect Link Script

포트폴리오 프로젝트 링크들을 나의 도메인으로 리다이렉트하는 nginx 서비스

## ✨ 기준 버전

- **Node.js**: 22.x (ESM)
- **TypeScript**: 5.8.x
- **Docker**: latest
- **GitHub Actions**: v4

## 🎯 프로젝트 목적

포트폴리오에 담을 링크들 (GitHub, Figma, 발표자료 등)을 서버에서 나의 도메인으로 리다이렉트하는 nginx 설정을 자동으로 관리하는 서비스입니다.

## 📂 프로젝트 구조

```
redirect-link-script/
├── 📁 data/
│   └── redirect-links.yml        # 링크 설정 파일
├── 📁 lib/
│   └── parse-yaml-file.ts        # YAML 파싱 유틸
├── 📁 script/
│   └── nginx-config.ts           # nginx 설정 생성 로직
├── 📁 types/
│   └── redirect-link.type.ts     # TypeScript 타입 정의
├── 📄 index.ts                   # 메인 실행 파일
├── 🐳 Dockerfile                 # Docker 이미지 설정
└── 🔄 .github/workflows/ci-cd.yml # GitHub Actions
```

## 🔧 사용법

### 1. 링크 설정

`data/redirect-links.yml` 파일에서 프로젝트별 링크들을 설정:

```yaml
yoi2ttang:
  github:
    url: https://github.com/pcjo1202/Yoi2ttang
  figma:
    url: https://www.figma.com/design/cyFhMWzGuFbeLrX3nsjyvz/...
  presentation:
    url: https://www.canva.com/design/DAGsBgcWL9E/...

IEUM:
  github:
    url: https://github.com/pcjo1202/IEUM
  figma:
    url: https://www.figma.com/design/yQxkEF8exrcaOX2usmbLAU/...
  presentation:
    url: https://www.canva.com/design/DAGkGpHLyco/...
```

### 2. 로컬 실행

```bash
# 의존성 설치
pnpm install

# nginx 설정 파일 생성
pnpm generate

# Docker 빌드 및 실행
docker build -t redirect-links .
docker run -p 8080:80 redirect-links
```

### 3. 리다이렉트 URL 접근

- `/{프로젝트명}/{링크타입}` → 해당 URL로 301 리다이렉트
- 예시:
  - `/yoi2ttang/github` → GitHub 저장소로 이동
  - `/IEUM/figma` → Figma 디자인으로 이동
  - `/SSACLE/presentation` → 발표자료로 이동

## 🚀 자동 배포

GitHub에 코드를 푸시하면:

1. **nginx.conf 생성**: TypeScript로 설정 파일 자동 생성
2. **Docker 빌드**: 최적화된 nginx 이미지 빌드
3. **서버 배포**: Oracle 서버에 자동 배포

## 🐳 Docker 사용

```bash
# GitHub Container Registry에서 가져오기
docker pull ghcr.io/{username}/redirect-link-script:latest

# 컨테이너 실행
docker run -d -p 80:80 ghcr.io/{username}/redirect-link-script:latest
```

## 💻 개발 가이드

### 새 프로젝트 링크 추가

1. `data/redirect-links.yml`에 새 프로젝트 추가
2. Git에 커밋/푸시
3. GitHub Actions가 자동으로 배포

### 타입 정의

```typescript
interface RedirectLinkData {
  topic: string;
  links: Record<string, { url: string }>;
}
```

## 📋 주요 스크립트

- `pnpm generate`: nginx.conf 파일 생성
- `pnpm dev`: 개발 모드 실행
- `pnpm build`: TypeScript 빌드

---

**간단하고 효율적인 포트폴리오 링크 관리 시스템** 🎯
