import fs from "fs";
import YAML from "yaml";
import type { RedirectLinkData } from "../types/redirect-link.type.ts";

export const parseYamlFile = (filePath: string) => {
  const yamlFile = fs.readFileSync(filePath, "utf-8");

  const parsedYaml = YAML.parse(yamlFile);

  const result: RedirectLinkData[] = Object.entries(parsedYaml).map(
    ([key, value]) => {
      return {
        topic: key,
        links: value as Record<string, { url: string }>,
      };
    }
  );

  return result;
};
