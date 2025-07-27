# Multi-stage build를 사용하여 효율적인 이미지 생성
FROM node:22-alpine AS builder
WORKDIR /app

# pnpm 설치 (corepack 사용)
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# package.json과 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# nginx 설정 파일 생성
RUN pnpm generate

# nginx 이미지
FROM nginx:alpine AS runner

# 생성된 nginx 설정 파일 복사
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# nginx 로그 디렉토리 권한 설정
RUN touch /var/log/nginx/access.log \
    && touch /var/log/nginx/error.log \
    && chmod 644 /var/log/nginx/*.log

# 포트 노출
EXPOSE 80

# nginx 시작 (데몬 모드 비활성화)
CMD ["nginx", "-g", "daemon off;"] 