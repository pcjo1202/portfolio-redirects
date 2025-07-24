import type { RedirectLinkData } from "../types/redirect-link.type";

export const nginxConfig = (data: RedirectLinkData[]) => {
  const redirectLinks = generateRedirectLinks(data);

  // nginx 설정 생성
  let nginxConfig = `events {
    worker_connections 1024;
}

http {
    # 기본 MIME 타입 설정
    default_type application/octet-stream;

    sendfile on; # 파일 전송 활성화
    keepalive_timeout 65; # 클라이언트와의 연결 유지 시간

    # 로그 설정
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    server {
        listen 80; # HTTP 포트
        server_name _; # 모든 도메인 허용

        # 기본 헬스체크 엔드포인트
        location /health {
            return 200 'OK';
        }

        # 루트 경로 - 사용 가능한 링크 목록 표시
        location = / {
            return 200 'Redirect Links Service\\n\\nAvailable links:\\n${generateLinksList(
              data
            )}';
        }
      
        # redirect links
${redirectLinks}

        # 404 페이지 (가장 마지막에 위치)
        location / {
            return 404 'Not Found';
        }
    }
}`;

  return nginxConfig;
};

const generateRedirectLinks = (data: RedirectLinkData[]) => {
  // 배열을 평탄화하고 문자열로 조인
  return data
    .map(({ topic, links }) => {
      return Object.entries(links)
        .map(([key, { url }]) => {
          return `        location /${topic}/${key} {
            return 301 ${url};
        }`;
        })
        .join("\n\n"); // 각 링크 사이에 빈 줄 추가
    })
    .join("\n\n"); // 각 토픽 사이에 빈 줄 추가
};

// 사용 가능한 링크 목록 생성
const generateLinksList = (data: RedirectLinkData[]) => {
  return data
    .map(({ topic, links }) => {
      return Object.keys(links)
        .map((key) => `/${topic}/${key}`)
        .join("\\n");
    })
    .join("\\n");
};
