import fs from "fs";

import { parseYamlFile } from "./lib/parse-yaml-file";
import { nginxConfig } from "./script/nginx-config";

function generateNginxConfig() {
  try {
    // YAML 파일 읽기
    const data = parseYamlFile("./data/redirect-links.yml");

    const nginxConfigString = nginxConfig(data);

    // nginx.conf 파일에 쓰기
    fs.writeFileSync("nginx.conf", nginxConfigString, "utf8");

    console.log("✅ nginx.conf 파일이 성공적으로 생성되었습니다!");
  } catch (error) {
    console.error("❌ 오류가 발생했습니다:", error);
    process.exit(1);
  }
}

// 파일 실행 시 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  generateNginxConfig();
}
