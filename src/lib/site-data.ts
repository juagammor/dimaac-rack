import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import settings from "@/config/settings.json";

type Presentation = typeof import("@/config/presentation.json");
type ProductCatalog = typeof import("@/data/products.json");

function loadJson<T>(configuredPath: string): T {
  const filePath = path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(process.cwd(), configuredPath);
  const content = readFileSync(filePath, "utf8");

  try {
    return JSON.parse(content) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in configured file "${filePath}".`, {
        cause: error,
      });
    }

    throw error;
  }
}

export const presentation = loadJson<Presentation>(settings.presentation);
export const catalogData = loadJson<ProductCatalog>(settings.products);
